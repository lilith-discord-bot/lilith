import { ClusterClient, getInfo } from 'discord-hybrid-sharding';
import { ClientOptions, Client as DiscordClient } from 'discord.js';

import { Logger } from '../lib/Logger';
import { options } from '../utils/Constants';
import EventHandler from '../events/EventHandler';
import { registerClientEvents } from '../lib/RegisterEvents';
import InteractionHandler from '../events/InteractionHandler';
import API from '../lib/API';

export class Client extends DiscordClient {
  /**
   * The cluster client.
   * @type {ClusterClient<DiscordClient>}
   * @readonly
   */
  readonly cluster: ClusterClient<DiscordClient>;

  /**
   * The logger class.
   * @type {typeof Logger}
   */
  readonly logger: typeof Logger;

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
