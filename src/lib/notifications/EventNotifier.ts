import { Message, MessageCreateOptions, MessagePayload, time } from "discord.js";

import { Client } from "../../core/Client";
import { Event, EventsList } from "../../types";
import { duration, wait } from "../../utils/Commons";
import { EventEmbed } from "../../utils/embeds/EventEmbed";
import { Broadcaster } from "./Broadcaster";
import { container } from "tsyringe";
import { clientSymbol } from "../../utils/Constants";
import { getEvents, getStatus } from "../API";

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
      let cache = await this.client.cache.get(`events:${key}`);

      const cachedEvent = JSON.parse(cache!) as Event;

      if (!cache || cachedEvent.timestamp !== value.timestamp) {
        await this.client.cache.set(`events:${key}`, JSON.stringify(value));

        const date = Date.now();
        const event = new Date(value.timestamp * 1000).getTime();

        if (event < date - duration.minutes(5)) {
          this.client.logger.info(`Event ${key} is outdated, skipping...`);
          continue;
        }

        const guilds = await this.client.repository.guild.getAllByEvent(key as EventsList);

        this.client.logger.info(`Found ${guilds.length} guilds with event ${key}.`);

        for (const guild of guilds) {
          this.client.logger.info(`Checking guild ${guild.id}...`);

          const embed = new EventEmbed(key, value, { client: this.client, guild });

          let message: string | MessagePayload | MessageCreateOptions = {
            content: getTitle(key, value),
            embeds: [embed],
          };

          const setting = guild.events.find((event) => event.type === (key as EventsList));

          if (!setting) return;
          if (!setting.enabled) continue;

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

          await wait(250);
        }

        this.client.logger.info(`Event ${key} has been broadcasted to ${guilds.length} guilds.`);
      }
    }
  }
}

/**
 * Get the event title.
 *
 * @param key - The event key.
 * @param event - The event object.
 *
 * @returns {string} - The event title.
 */
function getTitle(key: string, event: Event) {
  switch (key) {
    case "boss":
      return `${event.name} appears in ${event.zone} (${event.territory}) at ${time(event.timestamp, "t")}`;
    case "helltide":
      return `Helltide occuring until ${time(event.timestamp + 3600, "t")}, next helltide at ${time(
        event.timestamp + 8100,
        "t"
      )}`;
    case "legion":
      return `Legion appears ${time(event.timestamp, "R")}, next legion at ${time(event.timestamp + 1800, "t")}`;
    default:
      return key;
  }
}
