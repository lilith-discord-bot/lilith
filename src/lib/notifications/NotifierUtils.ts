import { time } from "discord.js";

import L from "../../i18n/i18n-node";
import { Locales } from "../../i18n/i18n-types";

import { territory } from "../../embeds/EventEmbed";

import { BossEvent, Event, HelltideEvent } from "../../types";

/**
 * Get the title for an event.
 *
 * @param key - The key to use for the title.
 * @param event - The event to use for the title.
 * @param locale - The locale to use for the title.
 *
 * @returns The title for the event.
 */
export const getTitle = (key: string, event: Event, locale: Locales = "en") => {
  switch (key) {
    case "boss":
      const boss = event as BossEvent;
      return L[locale].events.WORLD_BOSS({
        name: boss.name,
        zone: boss.zone,
        territory: boss.territory,
        time: time(boss.timestamp, "t"),
        countdown: time(boss.timestamp, "R"),
        nextName: boss.nextExpectedName,
        nextTime: time(boss.nextExpected, "f"),
      });
    case "helltide":
      const helltide = event as HelltideEvent;
      return L[locale].events.HELLTIDE({
        zone: territory[helltide.zone],
        time: time(helltide.timestamp + 3600, "t"),
        nextTime: time(helltide.timestamp + 8100, "t"),
        refresh: helltide.refresh > 0 ? time(helltide.refresh, "R") : "/",
      });
    case "legion":
      return L[locale].events.LEGION({
        time: time(event.timestamp, "R"),
        nextTime: time(event.timestamp + 1800, "t"),
      });
    default:
      return key;
  }
};

/**
 * Convert html string content to Discord markdown.
 *
 * @param htmlString - The html string to convert.
 *
 * @returns The markdown string.
 */
export const markdinate = (htmlString: string) =>
  htmlString
    .split("\n")
    .map((l) => l.trim())
    .join("\n")
    .replace(/\[.+\]/g, "")
    .replace(/\r\n/gm, "\n") // replace CRLF with LF
    .replace(/<\/?strong>/gm, "**") // swap <strong> tags for their md equivalent
    .replace(/<br\s*\/?>/g, "\n") // replace manual breaks with break character
    .replace(/<\/li>\s*<li>/gm, "</li>\n<li>") // clean up breaks between list items
    .replace(/<li\s?(?:class=".*")?\s?(?:dir=".*")?>\n/gm, "- ") // strip list items to bullets, replace later with emoji
    .replace(/ipsnoembed="false" /gm, "") // manually replace ipsnoembed, it causes issues given location
    .replace(/ipsnoembed="true" /gm, "") // manually replace ipsnoembed, it causes issues given location
    .replace(/<a href="(.*)" rel="external nofollow(?: noopener)?"\s?(?:target="_blank")?>(.*)<\/a>/gm, "[$2]($1)")
    .replace(/&amp;/gm, "&") // replace ampersand entity... it looks weird with some titles
    .replace(/<\/li>/gm, "") // strip li end tags
    .replace(/<(?:.|\n)*?>/gm, "") // replace all other tags, like images and paragraphs... cause they uuugly
    .replace(/-\s+\n/g, "- ")
    .replace(/\n\s*\n+\s*/gm, "\n\n") // strip 2+ line endings to max 2
    .replace(/\*\*\n\n/gm, "**\n") // strip any newlines between headers and content to collapse content
    .replace(/^\s*-\s*\n\s*\[/g, "- [")
    .replace(/^- /gm, ":white_small_square:") // swap bullets for emoji
    .trim();
