import { ChannelType, GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel, NewsChannel, TextChannel, time } from 'discord.js';
import { Client } from '../../core/Client';
import { Event } from '../../types';
import { duration, getGuild } from '../../utils/Commons';
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

      let alerts: {
        name: string;
        value: string;
      }[] = [];

      for (let [key, value] of Object.entries(events)) {

        const isCached = await this.client.cache.exists(`events:${key}`);

        if (!isCached)
          await this.client.cache.set(`events:${key}`, JSON.stringify(value));

        //@ts-ignore
        if (guild.settings.events[key as keyof typeof guild.settings.events].enabled) {

          const now = new Date().getTime();
          const start = value.timestamp
          const end = start + 3600000;

          if (start >= now && now <= end) {
            alerts.push({
              name: this.getKeyName(key, value, true),
              value: `Ending in ${time(end, 'R')}`
            });
          } else if (now >= end) {
            alerts.push({
              name: this.getKeyName(key, value, false),
              value: `No event is currently running.`
            });
          } else if (now >= start && now <= end) {
            alerts.push({
              name: this.getKeyName(key, value, true),
              value: `Starting in ${time(start, 'R')}`
            });
          }

          // @ts-ignore
          if (guild.settings.events[key as keyof typeof guild.settings.events].role) {


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
        }

        await this.client.cache.set(`events:${key}`, JSON.stringify(value));
      }

      if (alerts.length > 0) {

        const embed = new EventEmbed(alerts, {client: this.client, guild: guild});

        const messageId = await this.client.cache.get(`events:message:${guild.id}`);

        //@ts-ignore
        let channel = this.client.channels.cache.get(guild.settings.events.channel.id);

        if (!channel) return;

        if (![ChannelType.GuildText, ChannelType.GuildAnnouncement].includes(channel.type))
          return;

        channel = channel as TextChannel | NewsChannel;

        let message;

        if (!messageId) {

          message = await channel.send({
            embeds: [embed],
          });

          await this.client.cache.set(`events:message:${guild.id}`, message.id);
        }

        (await channel.messages.fetch()).filter((m) => m.id === messageId).first()?.edit({
          embeds: [embed],
        });
      }
    }
  }

  private getKeyName(key: string, value: Event, running: boolean): string {

    let message = '';

    switch (key) {
      case 'boss':
        if (running) {
          message = `${value.name} in ${value.zone}`
          if (value.territory)
            message += ` at ${value.territory}`
        }
        message = 'World Boss'
        break;
      case 'helltide':
        message = 'Helltide'
        break;
      case 'legion':
        if (running) {
          message = `Legion in ${value.zone}`
          if (value.territory)
            message += ` at ${value.territory}`
        }
        message = 'Legion';
        break;
      default:
        message = key
        break;
    }

    return message
  }
}
