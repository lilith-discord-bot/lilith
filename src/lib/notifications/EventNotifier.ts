import { MessageCreateOptions, MessagePayload, NewsChannel, Role, TextChannel, time } from 'discord.js';

import { Client } from '../../core/Client';
import { Event } from '../../types';
import { duration } from '../../utils/Commons';
import { EventEmbed } from '../../utils/embeds/EventEmbed';
import { Broadcaster } from './Broadcaster';

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

  constructor(client: Client) {
    this.client = client;

    this.broadcaster = new Broadcaster(this.client);

    this.init();
  }

  async init() {

    this.client.logger.info('Event notifier has been initialized.');

    setInterval(() => this.refresh(), refreshInterval);
  }

  private async refresh() {

    this.client.logger.info('Refreshing events...');

    const status = await this.client.api.getStatus();

    if (!status || !status.event_service) {
      this.client.logger.info('Event service is not available, skipping...');
      return;
    };

    const events = await this.client.api.getEvents();

    if (!events) {
      this.client.logger.info('No events found, skipping...');
      return
    };

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

        const guilds = await this.client.repository.guild.getAllByEvent(key as keyof typeof events);

        this.client.logger.info(`Found ${guilds.length} guilds with event ${key}.`);

        for (const guild of guilds) {

          this.client.logger.info(`Checking guild ${guild.id}...`);

          const embed = new EventEmbed(key, value, { client: this.client, guild });

          let message: string | MessagePayload | MessageCreateOptions = {
            content: getTitle(key, value),
            embeds: [embed],
          }

          const setting = guild.settings.events[key as keyof typeof guild.settings.events];

          if (!setting.enabled)
            continue;

          this.client.logger.info(`Event ${key} is enabled, broadcasting to guild ${guild.id}...`)

          if (setting.role) {
            const role = setting.role as any as Role;
            message.content += ` - <@&${role.id}>`;
            message.allowedMentions = {
              roles: [role.id],
            };
          }

          if (setting.schedule) {
            // TODO: Implement schedule
          }

          let channel = setting.channel as any as TextChannel | NewsChannel;

          if (!channel) {
            this.client.logger.info(`Event ${key} has no channel set, skipping...`);
            continue;
          };

          await this.broadcaster.broadcast(channel, message);
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
    case 'boss':
      return `${event.name} appears in ${event.zone} at ${time(event.timestamp, 'T')}`;
    case 'helltide':
      return `Helltide spawns in ${time(event.timestamp, 'R')} until ${time(event.timestamp + 3600, 'T')}, next helltide around ${time(event.timestamp + 7200, 'T')}`;
    case 'legion':
      return `Legion spawns in ${time(event.timestamp, 'R')}, next legion at ${time(event.timestamp + 1800, 'T')}`;
    default:
      return key;
  }
}