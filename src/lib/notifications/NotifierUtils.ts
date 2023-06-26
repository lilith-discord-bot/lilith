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
        nextName: boss.nextExpectedName,
        nextTime: time(boss.nextExpected, "t"),
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
