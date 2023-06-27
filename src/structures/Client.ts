import "reflect-metadata";

import { PrismaClient } from "@prisma/client";
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import { ClientOptions, Collection, Client as DiscordClient } from "discord.js";
import { container } from "tsyringe";

import { EventHandler } from "../events/EventHandler";

import { Logger } from "../lib/Logger";
import { registerClientEvents } from "../lib/RegisterEvents";
import { GuildRepository } from "../lib/db/postgresql/repository/Guild";
import { redis } from "../lib/db/redis/Redis";
import { database } from "../lib/db/postgresql/Database";

import { clientSymbol, options } from "../utils/Constants";

import { Interaction } from "./Interaction";

export class Client extends DiscordClient {
  /**
   * The cluster client.
   * @type {ClusterClient<DiscordClient>}
   * @readonly
   */
  public readonly cluster: ClusterClient<DiscordClient>;

  /**
   * The event handler.
   * @type {EventHandler}
   * @readonly
   */
  public readonly eventHandler: EventHandler;

  /**
   * Redis cache.
   * @type {typeof redis}
   * @readonly
   */
  public readonly cache: typeof redis;

  /**
   * The datasource
   * @type {PrismaClient}
   */
  public readonly database: PrismaClient;

  /**
   * Differents repositories.
   * @type {object}
   * @readonly
   */
  public readonly repository: {
    guild: GuildRepository;
  };

  /**
   * The logger class.
   * @type {typeof Logger}
   */
  public readonly logger: typeof Logger;

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
    super({
      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS,
      ...options,
    });

    container.register(clientSymbol, { useValue: this });

    this.cluster = new ClusterClient(this);

    this.eventHandler = new EventHandler();

    this.cache = redis;

    this.database = database;

    this.repository = {
      guild: new GuildRepository(),
    };

    this.logger = Logger;
  }

  /**
   * Initializes the client.
   *
   * @returns {Promise<this>} The client.
   */
  async init(): Promise<this> {
    await this.eventHandler.init();

    await registerClientEvents();

    await this.cache.connect();

    try {
      await super.login(process.env.TOKEN);
    } catch (err) {
      this.logger.error(err);
      process.exit(1);
    }

    return this;
  }

  /**
   * Destroys the client.
   */
  async destroy(): Promise<void> {
    await super.destroy();
    process.exit(0);
  }

  /**
   * Sets the interactions.
   *
   * @param interactions - The interactions.
   */
  setInteractions(interactions: Collection<string, Interaction>): void {
    this.interactions = interactions;
  }
}

/**
 * Let the ClusterManager spawn the client.
 *
 * TODO : Change this to a better way to spawn the client.
 */
(async () => {
  const bot = new Client(options);
  await bot.init();
})();
