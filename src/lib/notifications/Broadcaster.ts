import { Guild, GuildScheduledEventCreateOptions, Message, MessageCreateOptions, MessagePayload } from "discord.js";
import { container } from "tsyringe";

import { Client } from "../../structures/Client";

import { clientSymbol } from "../../utils/Constants";

export class Broadcaster {
  /**
   * The client instance.
   * @type {Client}
   * @private
   * @readonly
   */
  private readonly client: Client;

  constructor() {
    this.client = container.resolve<Client>(clientSymbol);
  }

  /**
   * Broadcasts a message to a channel.
   *
   * @param channel - The channel to broadcast the message to.
   * @param message - The message to broadcast.
   * @param key - The key to use for the message.
   */
  public async broadcast(
    channelId: string,
    message: string | MessagePayload | MessageCreateOptions,
    oldMessageId: string | null = null
  ): Promise<Message<true> | null> {
    const channel = this.client.channels.cache.get(channelId);

    if (!channel || !channel.isTextBased()) return;

    const oldMessage = oldMessageId
      ? ((await channel.messages.fetch(oldMessageId).catch((e) => {
          this.client.logger.error(`Unable to send fetch message ${oldMessageId}:`, e);
          return null;
        })) as Message<true>)
      : null;

    if (oldMessage)
      await oldMessage
        .delete()
        .catch((e) => this.client.logger.error(`Unable to remove message with id: ${oldMessageId}`, e));

    return await channel.send(message as string | MessagePayload | MessageCreateOptions).catch((e) => {
      this.client.logger.error(`Unable to send message`, e);
      return null;
    });
  }

  /**
   * Schedules an event for a guild.
   *
   * @param guild - The guild to schedule the event for.
   * @param options - The options for the event.
   *
   * @returns {Promise<void>} Nothing.
   */
  public async scheduleEvent(guild: Guild, options: GuildScheduledEventCreateOptions): Promise<void> {
    if (!guild) return;

    this.client.logger.info(`Creating scheduled event for guild ${guild.id}`);

    try {
      await guild.scheduledEvents.create(options);
    } catch (error) {
      this.client.logger.error(`Failed to create scheduled event for guild ${guild.id}`, error);
    }

    this.client.logger.info(`Scheduled event created for guild ${guild.id}`);
  }
}
