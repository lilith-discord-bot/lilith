import type { Translation } from "../i18n-types";

const hu = {
  settings: {
    locale: {
      SUCCESS: "Discord szervered nyelve a következőre frissítve: **{locale}**.",
    },
    notifications: {
      NO_PERMISSIONS: "Nincs elegendő jogosultságom, hogy üzenetet küldjek a(z) {channel} csatornába.",
      ALREADY_ENABLED: "A(z) **{event}** nevű eseménynek az értesítései már engedélyezve vannak.",
      ENABLED:
        "A(z) **{event}** nevű eseményhez tartozó értesítések engedélyezve lettek, ezeket a jövőben ide fogom küldeni: {channel}.",
      NOT_ENABLED: "Az értesítések a(z) **{event}** nevű eseményre nincsenek engedélyezve.",
      UPDATED:
        "Az értesítéseket a(z) **{event}** nevű eseményhez módosítottam, ezeket a jövőben ide fogom küldeni: {channel}.",
      DISABLED: "Az értesítések a(z) **{event}** nevű eseményre ki lettek kapcsolva.",
      ALREADY_DISABLED: "Az értesítések a(z) **{event}** nevű eseményre már ki lettek kapcsolva.",
      NO_EVENTS: "Nincs engedélyezett esemény.",
      NO_EVENTS_IN_CHANNEL: "Nincs engedélyezett esemény ebben a csatornában: {channel}.",
      EVENTS_WORKING: "A(z) **{event}** értesítései működnek és a {channel} csatornába lesznek továbbítva.",
      REFRESHED: "A(z) **{event}** nevű esemény frissítve lett és a {channels} csatornába lesznek továbbítva.",
    },
  },
  armory: {
    BAD_FORMAT: "A játékos név, amit megadtál nem megfelelő, próbálkozz az alábbi formátummal: `Player#1234`.",
    PLAYER_NOT_FOUND:
      "Nem találtam meg a **{player}** nevű játékost, kérlek ellenőrizd, hogy helyesen adtad-e meg a nevet, illetve hogy a játékos létezik-e.",
    NO_CHARACTERS: "Ennek a játékosnak nincsenek karakterei.",
    NO_CHARACTER:
      "Nem találtam meg a keresendő karaktert, kérlek ellenőrizd, hogy helyesen adtad-e meg a nevet, illetve hogy legalább 1 karakter létezik-e.",
    SELECT_CHARACTER: "Válassz egy karaktert, hogy megnézhesd a felszereléseit.",
    MULTIPLE_CHARACTERS: "Ennek a játékosnak több karaktere is van. Kérlek válassz egyet.",
    PLAYER_CHOICE: "{name} ({characters} karakter)",
    NOT_TRACKED_YET: '"{player}" jelenleg még nincs nyomon követve, próbáld meg beküldeni a nyomon követéshez.',
    ERROR: 'The player "{player}" is either in the website queue or is in private mode.',
  },
  events: {
    WORLD_BOSS:
      "{name} várható helye {zone} ({territory}), {time}-kor ({countdown}).\n\nKövetkező  várható boss {nextTime}-kor: {nextName}",
    HELLTIDE:
      "Helltide várható helye {zone}, {time}-ig, következő Helltide {nextTime}-kor\n\nHelltide láda frissítés: {refresh}",
    LEGION: "Legion kezdete: {time}, következő Legion {nextTime}-kor",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Statisztikák",
      STATISTICS_VALUE:
        "World Tier: {worldTier}\nMegölt szörnyek: {monstersKilled}\nMegölt elitek: {elitesKilled}\nÖsszegyűjtött arany: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Karakter létrehozás dátuma",
      LAST_PLAYED_TITLE: "Utoljára játszott",
      PLAYED_TIME_TITLE: "Játékidő",
      UNIQUES_TITLE: "Uniques",
      SKILLS_TITLE: "Skills",
      STATUS_TITLE: "Státusz",
      MODE_TITLE: "Mód",
      CLAN_TITLE: "Clan",
    },
    HELP: {
      TITLE: "{username} parancsai",
      DESCRIPTION: "Itt találhatod a parancsaimat. Hamarosan mégtöbb parancs leírás lesz elérhető!",
    },
    INFO: {
      STATISTICS_TITLE: "Statisztikák",
      STATISTICS_VALUE: "Szerverek: {servers}\nFelhasználók: {users}",
      DEBUG_TITLE: "Debug",
      DEBUG_VALUE: "Clusterek: {clusters}\nShardok: {shards}\nShardID: {shardId}\nClusterID: {clusterId}",
      DESCRIPTION:
        "{username} egy Discord bot, ami különböző információt ad Diablo 4-gyel kapcsolatban, fejlesztette: glazk0 & Marco.",
    },
    SETTINGS: {
      TITLE: "Az értesítés beállításaid",
      VALUE: "Csatorna: {channel}\nRang: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Ismeretlen lekérdezés.",
    NO_DATE_FOUND: "Nincs talált adat.",
    NO_PLAYED_TIME: "Nincs talált játékidő.",
    NO_EQUIPPED_ITEMS: "Nincs talált felszerelés.",
  },
} satisfies Translation;

export default hu;
