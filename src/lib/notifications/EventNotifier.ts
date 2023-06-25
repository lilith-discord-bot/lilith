import { Message, MessageCreateOptions, MessagePayload } from "discord.js";

import { container } from "tsyringe";
import { Client } from "../../core/Client";
import { EventEmbed } from "../../embeds/EventEmbed";
import { Locales } from "../../i18n/i18n-types";
import { Event, EventsList } from "../../types";
import { duration } from "../../utils/Commons";
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

    for (let [key, event] of Object.entries(events)) {
      let cache = await this.client.cache.get(`events:${this.client.user?.id}:${key}`);

      const oldEvent = JSON.parse(cache!) as Event;

      if (!cache || this.validate(key, oldEvent, event)) {
        await this.client.cache.set(`events:${this.client.user?.id}:${key}`, JSON.stringify(event));

        const guilds = await this.client.repository.guild.getAllByEvent(key as EventsList);

        this.client.logger.info(`Found ${guilds.length} guilds with event ${key}.`);

        for (const guild of guilds) {
          this.client.logger.info(`Checking guild ${guild.id}...`);

          const embed = new EventEmbed(key, event);

          let message: string | MessagePayload | MessageCreateOptions = {
            content: getTitle(key, event, guild.locale as Locales),
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
              await this.client.repository.guild.updateEventMessageId(
                guild.guildId,
                key as EventsList,
                setting.channelId,
                response[0]?.id
              );
            }

            // await wait(250);
          }
        }

        this.client.logger.info(`Event ${key} has been broadcasted to ${guilds.length} guilds.`);
      }
    }
  }

  /**
   * Validates the event by checking if it's outdated or not and if it has been updated.
   *
   * @param key - The event key
   * @param event - The event data
   *
   * @returns - Whether the event is valid or not
   */
  private validate(key: string, oldEvent: Event, event: Event) {
    const now = Date.now();
    const eventDate = new Date(event.timestamp * 1000).getTime();

    if (oldEvent.timestamp !== event.timestamp) {
      if (key === "helltide") {
        const delayTime = eventDate + duration.seconds(30);

        if (now > delayTime) {
          this.client.logger.info("Event needs to be delayed");
          return false;
        }
      }

      if (now < eventDate + duration.minutes(5)) {
        this.client.logger.info("Event is not outdated");
        return true;
      }
    }

    if (event.refresh && event.refresh > 0) {
      const refreshDate = new Date(event.refresh * 1000).getTime();
      const maxRefreshTime = refreshDate + duration.seconds(30);

      this.client.logger.info(`Event is refreshable, checking if it's time to refresh...`);

      if (now > refreshDate && now <= maxRefreshTime) {
        this.client.logger.info("Refreshing event...");
        return true;
      }
    }

    this.client.logger.info("Event is outdated");

    return false;
  }
}
