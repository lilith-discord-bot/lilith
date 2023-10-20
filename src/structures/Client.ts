import "reflect-metadata";

import { PrismaClient } from "@prisma/client";
import { ClientOptions, Collection, Client as DiscordClient, Events, RESTEvents } from "discord.js";
import { container } from "tsyringe";
import { type Logger } from "pino";

import { EventHandler } from "../events/EventHandler";

import { GuildRepository } from "../lib/db/postgresql/repository/Guild";
import { redis } from "../lib/db/redis/Redis";
import { database } from "../lib/db/postgresql/Database";

import { clientSymbol } from "../utils/Constants";

import { Interaction } from "./Interaction";
import { Cluster } from "./Cluster";
import InteractionHandler from "../events/InteractionHandler";

export class Client extends DiscordClient {
  /**
   * The cluster client.
   * @readonly
   */
  public readonly cluster: Cluster;

  /**
   * The event handler.
   * @readonly
   */
  public readonly eventHandler: EventHandler;

  /**
   * The interaction handler.
   * @readonly
   */
  public readonly interactionHandler: InteractionHandler;

  /**
   * Redis cache.
   * @readonly
   */
  public readonly cache: typeof redis;

  /**
   * The datasource
   * @readonly
   */
  public readonly database: PrismaClient;

  /**
   * Differents repositories.
   * @readonly
   */
  public readonly repository: {
    guild: GuildRepository;
  };

  /**
   * The logger class.
   * @readonly
   */
  public readonly logger: Logger;

  /**
   * The client's interactions.
   * @type {Collection<string, Interaction>}
   */
  public interactions: Collection<string, Interaction>;

  /**
   * Creates a new client.
   *
   * @param options - The client options.
   */
  constructor(options: ClientOptions) {
    super(options);

    container.register(clientSymbol, { useValue: this });

    this.cluster = new Cluster(this);

    this.eventHandler = new EventHandler();
    this.interactionHandler = new InteractionHandler();

    this.cache = redis;

    this.database = database;

    this.repository = {
      guild: new GuildRepository(),
    };

    this.logger = this.cluster.logger;
  }

  /**
   * Initializes the client.
   *
   * @returns {Promise<this>} The client.
   */
  public async init(): Promise<void> {
    this.registerEvents();

    Promise.all([
      this.interactionHandler.init(),
      this.eventHandler.init(),
      this.cache.connect(),
      this.login(process.env.TOKEN),
    ]).catch((err) => {
      this.logger.error("Failed to login", err);
      process.exit(1);
    });
  }

  private registerEvents(): void {
    this.once(Events.ClientReady, () => this.eventHandler.run(Events.ClientReady));

    this.on(Events.ShardReady, (id) => this.logger.info(`Shard #${id} ready on cluster #${this.cluster.id}`));

    this.on(Events.ShardReconnecting, (id) => this.logger.warn(`Shard #${id} reconnecting for cluster #${this.cluster.id}`));

    this.on(Events.ShardResume, (id, replayed) =>
      this.logger.info(`Shard #${id} resumed with ${replayed} replayed events for cluster #${this.cluster.id}`)
    );

    this.on(Events.ShardError, (error, id) =>
      this.logger.error(`Shard #${id} error for cluster #${this.cluster.id}`, error)
    );

    this.on(Events.ShardDisconnect, (event: any, id) =>
      this.logger.warn(`Shard #${id} disconnected with code ${event.code} for cluster #${this.cluster.id}`)
    );

    this.on(Events.InteractionCreate, (interaction) => this.eventHandler.run(Events.InteractionCreate, interaction));

    this.on(Events.GuildCreate, (guild) => this.eventHandler.run(Events.GuildCreate, guild));

    this.on(Events.GuildDelete, (guild) => this.eventHandler.run(Events.GuildDelete, guild));

    this.on(Events.ChannelDelete, (channel) => this.eventHandler.run(Events.ChannelDelete, channel));

    this.on(Events.Error, (error) => this.logger.error(error));

    this.on(Events.Warn, (message) => this.logger.warn(message));

    this.on(Events.Debug, (message) => this.logger.debug(message));

    this.rest.on(RESTEvents.Debug, (rateLimitData) => this.logger.debug(`Rate limit hit: ${rateLimitData}`));
  }

  /**
   * Sets the interactions.
   *
   * @param interactions - The interactions.
   */
  public setInteractions(interactions: Collection<string, Interaction>): void {
    this.interactions = interactions;
  }
}
