import {
  Channel,
  Guild,
  GuildScheduledEventCreateOptions,
  MessageCreateOptions,
  MessagePayload,
  NewsChannel,
  TextChannel,
} from 'discord.js';

import { Client } from '../../core/Client';

export class Broadcaster {
  /**
   * The client instance.
   */
  readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Broadcasts a message to a channel.
   *
   * @param channel - The channel to broadcast the message to.
   * @param message - The message to broadcast.
   */
  async broadcast(
    channel: Channel,
    message: string | MessagePayload | MessageCreateOptions,
  ): Promise<void> {
    await this.client.cluster.broadcastEval(
      async (c, { channelId, message }) => {

        console.log(channelId, message);

        let channel = c.channels.cache.get(channelId);

        if (!channel) {
          console.log('Channel not found');
          return;
        }

        channel = channel as TextChannel | NewsChannel;

        // const messages = (await channel.messages.fetch()).filter(
        //   (m) => m.author.id === c.user?.id,
        // );

        // if (messages.size > 0) {
        //   console.log(`Deleting ${messages.size} messages`);
        //   await messages.map((m) => m.delete());
        // }

        channel.send(message as string | MessagePayload | MessageCreateOptions);
      },
      {
        context: { channelId: channel.id, message },
      },
    );
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
