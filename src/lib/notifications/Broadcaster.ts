import { Guild, GuildScheduledEventCreateOptions, Message, MessageCreateOptions, MessagePayload } from "discord.js";
import { container } from "tsyringe";

import { Client } from "../../core/Client";

import { clientSymbol } from "../../utils/Constants";

export class Broadcaster {
  /**
   * The client instance.
   */
  readonly client: Client;

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
  async broadcast(
    channelId: string,
    message: string | MessagePayload | MessageCreateOptions,
    oldMessageId: string | null
  ): Promise<(Message<true> | null)[]> {
    return (await this.client.cluster.broadcastEval(
      async (c, { channelId, message, oldMessageId }) => {
        let channel = c.channels.cache.get(channelId);

        if (!channel || !channel.isTextBased()) return;

        const oldMessage = oldMessageId
          ? ((await channel.messages.fetch(oldMessageId).catch((e) => {
              console.error(`Unable to send fetch message ${oldMessageId}:`, e.message);
              return null;
            })) as Message<true>)
          : null;

        if (oldMessage)
          await oldMessage
            .delete()
            .catch((e) => console.error(`Unable to remove message with id: ${oldMessageId}`, e.message));

        return await channel.send(message as string | MessagePayload | MessageCreateOptions).catch((e) => {
          console.error(`Unable to send message`, e.message);
          return null;
        });
      },
      {
        context: { channelId, message, oldMessageId },
      }
    )) as (Message<true> | null)[];
  }

  /**
   * Schedules an event for a guild.
   *
   * @param guild - The guild to schedule the event for.
   * @param options - The options for the event.
   *
   * @returns {Promise<void>} Nothing.
   */
  async scheduleEvent(guild: Guild, options: GuildScheduledEventCreateOptions): Promise<void> {
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
