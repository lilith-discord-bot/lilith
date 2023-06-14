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

    const status = await this.client.api.getStatus();

    if (!status || !status.event_service) return;

    setInterval(() => this.refresh(), refreshInterval);
  }

  private async refresh() {

    this.client.logger.info('Refreshing events...');

    const events = await this.client.api.getEvents();

    if (!events) return;

    const guilds = await this.client.repository.guild.getAll();

    for (const guild of guilds) {

      for (let [key, value] of Object.entries(events)) {

        const isCached = await this.client.cache.exists(`events:${key}`);

        if (!isCached)
          await this.client.cache.set(`events:${key}`, JSON.stringify(value));

        let cache = await this.client.cache.get(`events:${key}`);

        const cachedEvent = JSON.parse(cache!) as Event;

        if (cachedEvent.timestamp !== value.timestamp) {

          this.client.logger.info(`Event ${key} is outdated, updating...`);

          await this.client.cache.set(`events:${key}`, JSON.stringify(value));

          this.client.logger.info(`Event ${key} has been updated.`);

          const date = Date.now();
          const event = new Date(value.timestamp * 1000).getTime();

          if (date > event) continue;

          const embed = new EventEmbed(key, value, { client: this.client, guild: guild });

          let message: string | MessagePayload | MessageCreateOptions = {
            content: getTitle(key, value),
            embeds: [embed],
          }

          //@ts-ignore
          if (guild.settings.events[key as keyof typeof guild.settings.events].enabled) {

            // @ts-ignore
            if (guild.settings.events[key as keyof typeof guild.settings.events].role) {
              const role = guild.settings.events[key as keyof typeof guild.settings.events].role as any as Role;
              message.content += ` - <@&${role.id}>`;
              message.allowedMentions = {
                roles: [role.id],
              };
            }

            // @ts-ignore
            if (guild.settings.events[key as keyof typeof guild.settings.events].schedule) {

              // const clusterGuild = await getGuild(this.client, guild.id);

              // if (!clusterGuild) return;

              // await this.broadcaster.scheduleEvent(clusterGuild, {
              //   name: this.getKeyName(key, value, true),
              //   entityType: GuildScheduledEventEntityType.External,
              //   privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
              //   scheduledStartTime: new Date().toLocaleString(),
              //   scheduledEndTime: new Date().toLocaleString(),
              //   entityMetadata: {
              //     location: value.zone && value.territory ? `${value.zone} at ${value.territory}` : '',
              //   }
              // })
            }

            // @ts-ignore
            let channel = guild.settings.events[key as keyof typeof guild.settings.events].channel as TextChannel | NewsChannel;

            if (!channel) continue;

            this.broadcaster.broadcast(channel, message);
          }
        }
      }
    }
  }
}


function getTitle(key: string, event: Event) {
  switch (key) {
    case 'boss':
      return `${event.name} appears in ${event.zone} at ${time(event.timestamp, 'T')}`;
    case 'helltide':
      return `Helltide spawns in ${time(event.timestamp, 'R')} until ${time(event.timestamp + 3600, 'T')}`;
    case 'legion':
      return `Legion spawns in ${time(event.timestamp, 'R')}, next legion at ${time(event.timestamp + 1800, 'T')}`;
    default:
      return key;
  }
}