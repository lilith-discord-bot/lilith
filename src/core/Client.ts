import { ClusterClient, getInfo } from 'discord-hybrid-sharding';
import { ClientOptions, Client as DiscordClient } from 'discord.js';

import EventHandler from '../events/EventHandler';

import API from '../lib/API';
import { Logger } from '../lib/Logger';
import { registerClientEvents } from '../lib/RegisterEvents';

import { options } from '../utils/Constants';
import { redis } from '../utils/Redis';
import Database from '../lib/Database';
import { DataSource } from 'typeorm';

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

  readonly cache: typeof redis;

  /**
   * The logger class.
   * @type {typeof Logger}
   */
  readonly logger: typeof Logger;

  /**
   * The datasource
   * @type {typeof DataSource}
   */
  readonly database: DataSource;

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

    this.database = Database;

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
