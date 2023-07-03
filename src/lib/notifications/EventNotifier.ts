import { CronJob } from "cron";
import { Message, MessageCreateOptions, MessagePayload } from "discord.js";
import { container } from "tsyringe";

import { EventEmbed } from "../../embeds/EventEmbed";
import { Locales } from "../../i18n/i18n-types";
import { Client } from "../../structures/Client";
import { Events, EventsList, HelltideEvent } from "../../types";
import { clusterIdOfGuildId, duration } from "../../utils/Commons";
import { clientSymbol } from "../../utils/Constants";
import { getEvents, getStatus } from "../API";
import { Broadcaster } from "./Broadcaster";
import { getTitle } from "./NotifierUtils";

const refreshInterval = duration.seconds(60);

/**
 * The event notifier handler.
 */
export class EventNotifier {
  /**
   * The client instance.
   * @type {Client}
   * @readonly
   */
  readonly client: Client;

  /**
   * The broadcaster instance.
   * @type {Broadcaster}
   * @readonly
   */
  readonly broadcaster: Broadcaster;

  constructor() {
    this.client = container.resolve<Client>(clientSymbol);
    this.broadcaster = new Broadcaster();

    this.init();
  }

  async init() {
    this.client.logger.info("Event notifier has been initialized.");
    new CronJob("0 */1 * * * *", () => this.refresh(), null, true, "Europe/Brussels").start();
  }

  private async refresh() {
    this.client.logger.info("Refreshing events...");

    const [status, events] = await Promise.all([getStatus(), getEvents()]);

    if (!status || !status.event_service) {
      this.client.logger.info("Event service is not available, skipping...");
      return;
    }

    if (!events) {
      this.client.logger.info("No events found, skipping...");
      return;
    }

    for (let [key, event] of Object.entries(events)) {
      if (key === "whispers") continue;
      const exist = await this.client.database.notification.findFirst({
        where: {
          type: key,
          timestamp: event.timestamp,
          clusterId: this.client.cluster.id,
        },
      });

      if (!exist || (exist.refreshTimestamp > 0 && !exist.refreshed)) {
        // If it doesn't exist, create it
        if (!exist) {
          const now = Date.now();
          const eventDate = new Date(event.timestamp * 1000).getTime();
          const delayDate = new Date(event.timestamp * 1000).getTime() + duration.seconds(30);

          // If the event is too recent, skip it
          if (key === Events.Helltide && now < delayDate) {
            this.client.logger.info(`Event ${key} is too recent, waiting...`);
            continue;
          }

          const refreshTimestamp = key === Events.Helltide ? (event as HelltideEvent).refresh : 0;

          try {
            await this.client.database.notification.create({
              data: {
                type: key,
                data: event,
                timestamp: event.timestamp,
                refreshTimestamp: refreshTimestamp,
                clusterId: this.client.cluster.id,
              },
            });
          } catch (error) {
            this.client.logger.error(`Failed to create event ${key}: ${error.message}`);
          }

          // If the event is too old, skip it
          if (now > eventDate + duration.minutes(5)) {
            this.client.logger.info(`Event ${key} is too old, skipping...`);
            continue;
          }
        }

        // If it exists but it's not refreshed, refresh it
        if (exist && exist.refreshTimestamp && exist.refreshTimestamp > 0 && !exist.refreshed) {
          const now = Date.now();
          const startDate = new Date(exist.timestamp * 1000).getTime();
          const refreshDate = new Date(exist.refreshTimestamp * 1000).getTime();
          const endDate = startDate + duration.hours(1);

          // If now is not between the start and end date, and before the refresh date, skip it
          if (!(now >= startDate && now <= endDate) || now < refreshDate) {
            this.client.logger.info(`Event ${key} is not ready to be refreshed, skipping...`);
            continue;
          }

          try {
            await this.client.database.notification.update({
              where: {
                id: exist.id,
              },
              data: {
                refreshed: true,
              },
            });
          } catch (error) {
            this.client.logger.error(`Failed to refresh event ${key}: ${error.message}`);
          }
        }

        let settings = await this.client.database.event.findMany({
          where: {
            type: key,
          },
          include: {
            Guild: {
              select: {
                locale: true,
              },
            },
          },
        });

        if (!settings || !settings.length) continue;

        const embed = new EventEmbed(key, event);

        let message: string | MessagePayload | MessageCreateOptions;

        settings = settings.filter((s) => clusterIdOfGuildId(this.client, s.guildId) === this.client.cluster.id);

        // WIP need to refactor this

        const sendPromises = settings.map((setting) => {
          this.client.logger.info(`Event ${key} is enabled, broadcasting to guild ${setting.guildId}...`);

          message = {
            embeds: [embed],
            content: getTitle(key, event, setting.Guild.locale as Locales),
          };

          if (setting.roleId) {
            message.content += ` - <@&${setting.roleId}>`;
            message.allowedMentions = {
              roles: [setting.roleId],
            };
          }

          // if (setting.schedule) {
          //   // TODO: Implement schedule
          // }

          return this.send(setting.channelId, message, setting.messageId);
        });

        const sendResponses = await Promise.all(sendPromises);

        for (let i = 0; i < settings.length; i++) {
          const response = sendResponses[i];
          const setting = settings[i];

          if (response) {
            try {
              await this.client.repository.guild.updateEventMessageId(
                setting.guildId,
                key as EventsList,
                setting.channelId,
                response.id
              );
            } catch (error) {
              this.client.logger.error("Error updating message:", error);
            }
          }
        }

        this.client.logger.info(`Event ${key} has been broadcasted to ${settings.length} guilds.`);
      }
    }
  }

  private async send(
    channelId: string,
    message: string | MessagePayload | MessageCreateOptions,
    oldMessageId: string | null
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
}
