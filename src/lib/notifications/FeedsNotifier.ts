import { MessageCreateOptions, MessagePayload } from "discord.js";
import RssFeedEmitter from "rss-feed-emitter";
import { container } from "tsyringe";

import { RSSEmbed } from "../../embeds/RSSEmbed";

import { Client } from "../../structures/Client";

import { Events, RSSFeedItem } from "../../types";

import { clusterIdOfGuildId } from "../../utils/Commons";
import { RSSFeeds, clientSymbol } from "../../utils/Constants";

import { Broadcaster } from "./Broadcaster";
import { markdinate } from "./NotifierUtils";

export class FeedsNotifier {
  /**
   * The client instance.
   * @type {Client}
   * @readonly
   */
  private readonly client: Client;

  /**
   * The broadcaster instance.
   * @type {Broadcaster}
   * @readonly
   */
  private readonly broadcaster: Broadcaster;

  /**
   * The feeder instance.
   * @type {RssFeedEmitter}
   * @readonly
   */
  private readonly feeder: RssFeedEmitter;

  /**
   * The date when the notifier has been started.
   * @type {Date}
   */
  private start: Date;

  /**
   * The old items that have been sent.
   * @type {RSSFeedItem[]}
   * @private
   */
  private oldItems: RSSFeedItem[] = [];

  constructor() {
    this.client = container.resolve<Client>(clientSymbol);

    this.feeder = new RssFeedEmitter({
      userAgent: `Lilith/DiscordBot`,
      skipFirstLoad: true,
    });

    RSSFeeds.forEach((feed) => {
      this.feeder.add({
        url: feed.url,
        refresh: feed.refreshTime,
      });
    });

    this.init();
  }

  /**
   * Initializes the notifier.
   */
  private async init() {
    this.start = new Date();

    this.feeder.on("new-item", (item) => this.handle(item));

    this.client.logger.info("Feeds notifier has been initialized.");
  }

  /**
   * Handles a new feed.
   *
   * @param item - The feed item.
   */
  private async handle(item: RSSFeedItem) {
    if (!this.isNew(item)) return;

    try {
      this.client.logger.info(`New feed: ${item.title}`);

      const title = markdinate(item.title);
      const similar = this.oldItems.find((i) => markdinate(i.title) === title);

      if (similar) {
        this.client.logger.info(`Feed is similar to ${similar.title}, skipping...`);
        return;
      }

      this.oldItems.push(item);

      const feed = RSSFeeds.find((feed) => feed.url === item.meta.link);

      const embed = new RSSEmbed(item, feed);

      let settings = await this.client.database.event.findMany({
        where: {
          type: Events.BlizzardUpdates,
        },
        include: {
          Guild: {
            select: {
              locale: true,
            },
          },
        },
      });

      if (!settings || !settings.length) return;

      settings = settings.filter((s) => clusterIdOfGuildId(this.client, s.guildId) === this.client.cluster.id);

      let message: string | MessagePayload | MessageCreateOptions = {
        embeds: [embed],
      };

      await Promise.all(
        settings.map((setting) => {
          message = {
            content: setting.roleId ? `<@&${setting.roleId}>` : undefined,
            allowedMentions: {
              roles: setting.roleId ? [setting.roleId] : undefined,
            },
          };

          this.client.logger.info(`Feed, broadcasting to guild ${setting.guildId}...`);

          return this.broadcaster.broadcast(setting.channelId, message);
        })
      );
    } catch (error) {
      this.client.logger.error(`Failed to handle feed: ${error}`);
    }
  }

  /**
   * Checks if the feed is new.
   *
   * @param pubDate - The publication date.
   *
   * @returns {boolean} - True if the feed is new, false otherwise.
   */
  private isNew(item: RSSFeedItem) {
    return new Date(item.pubDate).getTime() >= this.start.getTime();
  }
}
