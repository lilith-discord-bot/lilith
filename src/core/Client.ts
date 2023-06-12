import { ClusterClient, getInfo } from 'discord-hybrid-sharding';
import { ClientOptions, Client as DiscordClient } from 'discord.js';
import { DataSource } from 'typeorm';

import EventHandler from '../events/EventHandler';

import { API } from '../lib/API';
import { Logger } from '../lib/Logger';
import { registerClientEvents } from '../lib/RegisterEvents';
import { database } from '../lib/db/postgresql/Database';
import { redis } from '../lib/db/redis/Redis';

import { GuildRepository } from '../lib/db/postgresql/repository/Guild';
import { options } from '../utils/Constants';

export class Client extends DiscordClient {
  /**
   * The cluster client.
   * @type {ClusterClient<DiscordClient>}
   * @readonly
   */
  readonly cluster: ClusterClient<DiscordClient>;

  /**
   * The event handler.
   * @type {EventHandler}
   * @readonly
   */
  readonly eventHandler: EventHandler;

  /**
   * The API class.
   * @type {API}
   * @readonly
   */
  readonly api: API;

  /**
   * Redis cache.
   * @type {typeof redis}
   * @readonly
   */
  readonly cache: typeof redis;

  /**
   * The datasource
   * @type {DataSource}
   */
  readonly database: DataSource;

  /**
   * Differents repositories.
   * @type {object}
   * @readonly
   */
  readonly repository: {
    guild: GuildRepository;
  };

  /**
   * The logger class.
   * @type {typeof Logger}
   */
  readonly logger: typeof Logger;

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

    this.cluster = new ClusterClient(this);

    this.eventHandler = new EventHandler(this);

    this.api = new API();

    this.cache = redis;

    this.database = database;

    this.repository = {
      guild: new GuildRepository(this),
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

    await registerClientEvents(this);

    await this.cache.connect();
    await this.database.initialize();

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
