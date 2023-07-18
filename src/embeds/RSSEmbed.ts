import { Embed } from "./Embed";

import { RSSFeed, RSSFeedItem } from "../types";

import { markdinate } from "../lib/notifications/NotifierUtils";

export class RSSEmbed extends Embed {
  constructor(item: RSSFeedItem, feed: RSSFeed) {
    super();

    this.data.title = markdinate(item.title);

    this.data.thumbnail = {
      url: feed.footerAttach,
    };

    this.data.color = 0x0178ff;

    if (item.description) this.data.description = markdinate(item.description || "\u200B");

    if (item.link) this.data.url = item.link;

    this.data.timestamp = item.pubDate;

    this.data.footer = {
      text: feed.name,
      icon_url: feed.footerAttach,
    };
  }
}
