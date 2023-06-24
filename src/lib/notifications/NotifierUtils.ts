import { time } from "discord.js";

import L from "../../i18n/i18n-node";
import { Locales } from "../../i18n/i18n-types";

import { territory } from "../../embeds/EventEmbed";

import { Event } from "../../types";

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
};
