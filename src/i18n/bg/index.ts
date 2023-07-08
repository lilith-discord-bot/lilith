import type { Translation } from "../i18n-types";

const bg = {
  settings: {
    locale: {
      SUCCESS: "Езикът на вашия Discord сървър е обновен на **{locale}**.",
    },
    notifications: {
      NO_PERMISSIONS: "Нямам разрешение да изпращам съобщения в {channel}.",
      ALREADY_ENABLED: "Известията за **{event}** вече са активирани.",
      ENABLED: "Известията за **{event}** са активирани и ще бъдат изпращани в {channel}.",
      NOT_ENABLED: "Известията за **{event}** не са активирани.",
      UPDATED: "Известията за **{event}** са обновени и ще бъдат изпращани в {channel}.",
      DISABLED: "Известията за **{event}** са деактивирани.",
      ALREADY_DISABLED: "Известията за **{event}** вече са деактивирани.",
      NO_EVENTS: "Няма активирани събития.",
      NO_EVENTS_IN_CHANNEL: "Няма активирани събития в {channel}.",
      EVENTS_WORKING: "Известията за **{event}** работят и ще бъдат изпращани в {channel}.",
      REFRESHED: "Известията за **{event}** са обновени и ще бъдат изпращани в {channels}.",
    },
  },
  armory: {
    BAD_FORMAT: "Играчът, който сте предоставили, не е валиден, трябва да е в следния формат: `Player#1234`.",
    PLAYER_NOT_FOUND:
      "Не успях да намеря играч **{player}**, уверете се, че сте написали името правилно или че играчът съществува.",
    NO_CHARACTERS: "Играчът няма никакви герои.",
    NO_CHARACTER: "Не е открит герой, уверете се, че сте написали името правилно или че поне един герой съществува.",
    SELECT_CHARACTER: "Изберете героя, на когото искате да разгледате оборудването.",
    MULTIPLE_CHARACTERS: "Този играч има няколко герои. Моля, изберете един.",
    PLAYER_CHOICE: "{name} ({characters} герои)",
    NOT_TRACKED_YET: '"{player}" в момента не се проследява, изпратете, за да го проследите.',
    ERROR: 'The player "{player}" is either in the website queue or is in private mode.',
  },
  events: {
    WORLD_BOSS:
      "{name} ще се появи в {zone} ({territory}) в {time} ({countdown}).\n\nСледващият очакван бос е {nextName} в {nextTime}",
    HELLTIDE: "Helltide се провежда в {zone} до {time}, следващ Helltide в {nextTime}\n\nОбновяване на сандъците: {refresh}",
    LEGION: "Ще се появи Legion {time}, следващ Legion в {nextTime}",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Статистика",
      STATISTICS_VALUE:
        "World Tier: {worldTier}\nУбити чудовища: {monstersKilled}\nУбити елити: {elitesKilled}\nСъбрано злато: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Създаване на герой",
      LAST_PLAYED_TITLE: "Последно игран",
      PLAYED_TIME_TITLE: "Изиграно време",
      UNIQUES_TITLE: "Uniques",
      SKILLS_TITLE: "Skills",
      STATUS_TITLE: "Статус",
      MODE_TITLE: "Режим",
      CLAN_TITLE: "Clan",
    },
    HELP: {
      TITLE: "Команди на {username}",
      DESCRIPTION:
        "Ето списък с всичките ми команди. Скоро ще добавим възможността да получите повече информация за всяка команда!",
    },
    INFO: {
      STATISTICS_TITLE: "Статистика",
      STATISTICS_VALUE: "Servers: {servers}\nUsers: {users}",
      DEBUG_TITLE: "Debug",
      DEBUG_VALUE: "Clusters: {clusters}\nShards: {shards}\nShardID: {shardId}\nClusterID: {clusterId}",
      DESCRIPTION: "{username} е Discord bot, който предоставя информация за Diablo 4, разработен от glazk0 & Marco.",
    },
    SETTINGS: {
      TITLE: "Настройки за известия на вашия сървър",
      VALUE: "Channel: {channel}\nРоля: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Невалидна заявка.",
    NO_DATE_FOUND: "Не е намерена дата.",
    NO_PLAYED_TIME: "Не е намерено изиграно време.",
    NO_EQUIPPED_ITEMS: "Не са намерени оборудвани предмети.",
  },
} satisfies Translation;

export default bg;
