import {
  Channel,
  Guild,
  GuildScheduledEventCreateOptions,
  MessageCreateOptions,
  MessagePayload,
  NewsChannel,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";

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
  async broadcast(channel: Channel, message: string | MessagePayload | MessageCreateOptions, key?: string): Promise<void> {
    await this.client.cluster.broadcastEval(
      async (c, { channelId, message }) => {
        let channel = c.channels.cache.get(channelId);

        if (!channel) return;

        channel = channel as TextChannel | NewsChannel;

        //  && m.embeds.length > 0 && m.embeds[0].footer?.text === key
        let messages = (await channel.messages.fetch()).filter((m) => m.author.id === c.user?.id);

        if (messages.size > 0) await messages.map((m) => m.delete());

        await channel.send(message as string | MessagePayload | MessageCreateOptions).catch(() => {});
      },
      {
        context: { channelId: channel.id, message },
      }
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
