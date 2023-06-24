import { Message, MessageCreateOptions, MessagePayload, time } from "discord.js";

import { Client } from "../../core/Client";
import { Event, EventsList } from "../../types";
import { duration, wait } from "../../utils/Commons";
import { EventEmbed, territory } from "../../embeds/EventEmbed";
import { Broadcaster } from "./Broadcaster";
import { container } from "tsyringe";
import { clientSymbol } from "../../utils/Constants";
import { getEvents, getStatus } from "../API";
import L from "../../i18n/i18n-node";
import { Locales } from "../../i18n/i18n-types";

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

    setInterval(() => this.refresh(), refreshInterval);
  }

  private async refresh() {
    this.client.logger.info("Refreshing events...");

    const status = await getStatus();

    if (!status || !status.event_service) {
      this.client.logger.info("Event service is not available, skipping...");
      return;
    }

    const events = await getEvents();

    if (!events) {
      this.client.logger.info("No events found, skipping...");
      return;
    }

    for (let [key, value] of Object.entries(events)) {
      let cache = await this.client.cache.get(`events:${this.client.user?.id}:${key}`);

      const cachedEvent = JSON.parse(cache!) as Event;

      const date = Date.now();

      if (!cache || cachedEvent.timestamp !== value.timestamp || this.checkRefresh(value)) {
        await this.client.cache.set(`events:${this.client.user?.id}:${key}`, JSON.stringify(value));

        if (value.refresh && value.refresh > 0) {
          if (date / 1000 < value.refresh || date / 1000 > value.refresh + 60) {
            this.client.logger.info(`Refresh ${key} is outdated, skipping...`);
            continue;
          }
        } else {
          const event = new Date(value.timestamp * 1000).getTime();

          if (event < date - duration.minutes(2)) {
            this.client.logger.info(`Event ${key} is outdated, skipping...`);
            continue;
          }
        }

        const guilds = await this.client.repository.guild.getAllByEvent(key as EventsList);

        this.client.logger.info(`Found ${guilds.length} guilds with event ${key}.`);

        for (const guild of guilds) {
          this.client.logger.info(`Checking guild ${guild.id}...`);

          const embed = new EventEmbed(key, value);

          let message: string | MessagePayload | MessageCreateOptions = {
            content: this.getTitle(key, value, guild.locale as Locales),
            embeds: [embed],
          };

          const settings = guild.events.filter((event) => event.type === (key as EventsList));

          if (!settings || settings.length === 0) continue;

          for (let setting of settings) {
            this.client.logger.info(`Event ${key} is enabled, broadcasting to guild ${guild.id}...`);

            if (setting.roleId) {
              message.content += ` - <@&${setting.roleId}>`;
              message.allowedMentions = {
                roles: [setting.roleId],
              };
            }

            // if (setting.schedule) {
            //   // TODO: Implement schedule
            // }

            if (!setting.channelId) {
              this.client.logger.info(`Event ${key} has no channel set, skipping...`);
              continue;
            }

            const response = (await this.broadcaster.broadcast(
              setting.channelId,
              message,
              setting.messageId
            )) as (Message<true> | null)[];

            if (response && response.length >= 1) {
              await this.client.database.event.update({
                data: { messageId: response[0]?.id },
                where: {
                  type_channelId: {
                    type: key,
                    channelId: setting.channelId,
                  },
                },
              });
            }

            // await wait(250);
          }
        }

        this.client.logger.info(`Event ${key} has been broadcasted to ${guilds.length} guilds.`);
      }
    }
  }

  /**
   * TODO - Implement refresh
   */
  private checkRefresh(event: Event) {
    if (event.refresh && event.refresh > 0) {
      const date = Date.now();

      if (date / 1000 > event.refresh && date / 1000 < event.refresh + 60) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get the event title.
   *
   * @param key - The event key.
   * @param event - The event object.
   *
   * @returns {string} - The event title.
   */

  private getTitle(key: string, event: Event, locale: Locales = "en") {
    switch (key) {
      case "boss":
        return L[locale].events.WORLD_BOSS({
          name: event.name,
          zone: event.zone,
          territory: event.territory,
          time: time(event.timestamp, "t"),
          nextName: event.nextExpectedName,
          nextTime: time(event.nextExpected, "t"),
        });
      case "helltide":
        return L[locale].events.HELLTIDE({
          zone: territory[event.zone],
          time: time(event.timestamp + 3600, "t"),
          nextTime: time(event.timestamp + 8100, "t"),
          refresh: event.refresh > 0 ? time(event.refresh, "R") : "/",
        });
      case "legion":
        return L[locale].events.LEGION({
          time: time(event.timestamp, "R"),
          nextTime: time(event.timestamp + 1800, "t"),
        });
      default:
        return key;
    }
  }
}
