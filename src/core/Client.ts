import { ClusterClient, getInfo } from 'discord-hybrid-sharding';
import { ClientOptions, Client as DiscordClient } from 'discord.js';

import { Logger } from '../lib/Logger';
import { options } from '../utils/Constants';
import EventHandler from '../events/EventHandler';
import { registerClientEvents } from '../lib/RegisterEvents';

export class Client extends DiscordClient {
  /**
   * The cluster client.
   * @type {ClusterClient<DiscordClient>}
   * @readonly
   */
  public readonly cluster: ClusterClient<DiscordClient>;

  /**
   * The logger class.
   * @type {typeof Logger}
   */
  public readonly logger: typeof Logger;

  /**
   * The event handler.
   * @type {EventHandler}
   * @readonly
   */
  public readonly eventHandler: EventHandler;

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

    this.logger = Logger;

    this.eventHandler = new EventHandler(this);
  }

  /**
   * Initializes the client.
   *
   * @returns {Promise<this>} The client.
   */
  public async init(): Promise<this> {

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
  public async destroy(): Promise<void> {
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
