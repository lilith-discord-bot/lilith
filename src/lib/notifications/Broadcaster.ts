import {
  Channel,
  ChannelType,
  Guild,
  GuildScheduledEventCreateOptions,
  NewsChannel,
  TextChannel,
} from 'discord.js';

import { Client } from '../../core/Client';
import { Embed } from '../../utils/embeds/Embed';

export class Broadcaster {
  /**
   * The client instance.
   */
  readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Schedules an event for a guild.
   *
   * @param guild - The guild to schedule the event for.
   * @param options - The options for the event.
   *
   * @returns {Promise<void>} Nothing.
   */
  async scheduleEvent(
    guild: Guild,
    options: GuildScheduledEventCreateOptions,
  ): Promise<void> {

    if (!guild) return;

    this.client.logger.info(`Creating scheduled event for guild ${guild.id}`);

    try {
      await guild.scheduledEvents.create(options);
    } catch (error) {
      this.client.logger.error(error);
    }

    this.client.logger.info(`Scheduled event created for guild ${guild.id}`);
  }
}
