import type { BaseTranslation } from "../i18n-types";

const en = {
  settings: {
    locale: {
      SUCCESS: "Your Discord server locale has been updated to **{locale}**.",
    },
    notifications: {
      NO_PERMISSIONS: "I don't have permissions to send messages in {channel}.",
      ALREADY_ENABLED: "Notifications for **{event}** are already enabled.",
      ENABLED: "Notifications for **{event}** have been enabled and will be sent to {channel}.",
      NOT_ENABLED: "Notifications for **{event}** are not enabled.",
      UPDATED: "Notifications for **{event}** have been updated and will be sent to {channel}.",
      DISABLED: "Notifications for **{event}** have been disabled.",
      ALREADY_DISABLED: "Notifications for **{event}** are already disabled.",
      NO_EVENTS: "There are no events enabled.",
      NO_EVENTS_IN_CHANNEL: "There are no events enabled in {channel}.",
      EVENTS_WORKING: "Notifications for **{event}** are working and will be sent to {channel}.",
      REFRESHED: "Notifications for **{event}** have been refreshed and will be sent to {channels}.",
    },
  },
  armory: {
    BAD_FORMAT: "The player you provided is not valid, it needs to be in the following format: `Player#1234`.",
    PLAYER_NOT_FOUND:
      "I couldn't find the player **{player}**, make sure you typed the name correctly or that the player exists.",
    NO_CHARACTERS: "The player doesn't have any characters.",
    NO_CHARACTER: "No character found, make sure you typed the name correctly or that at least one character exists.",
    SELECT_CHARACTER: "Select a character to get the armory of.",
    MULTIPLE_CHARACTERS: "This player has multiple characters. Please select one.",
    PLAYER_CHOICE: "{name} ({characters} characters)",
    NOT_TRACKED_YET: '"{player}" isn\'t currently tracked, send to track it.',
    ERROR: 'The player "{player}" is either in the website queue or is in private mode.',
  },
  events: {
    WORLD_BOSS:
      "{name} appears in {zone} ({territory}) at {time} ({countdown}).\n\nNext expected boss is {nextName} at {nextTime}",
    HELLTIDE: "Helltide occuring in {zone} until {time}, next helltide at {nextTime}\n\nChests refresh: {refresh}",
    LEGION: "Legion appears {time}, next legion at {nextTime}",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Statistics",
      STATISTICS_VALUE:
        "World Tier: {worldTier}\nMonsters killed: {monstersKilled}\nElites killed: {elitesKilled}\nGold collected: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Character creation",
      LAST_PLAYED_TITLE: "Last played",
      PLAYED_TIME_TITLE: "Played time",
      UNIQUES_TITLE: "Uniques",
      SKILLS_TITLE: "Skills",
      STATUS_TITLE: "Status",
      MODE_TITLE: "Mode",
      CLAN_TITLE: "Clan",
    },
    HELP: {
      TITLE: "{username}'s commands",
      DESCRIPTION:
        "Here's a list of all my commands. We'll be adding the ability to get more information about each command soon!",
    },
    INFO: {
      STATISTICS_TITLE: "Statistics",
      STATISTICS_VALUE: "Servers: {servers}\nUsers: {users}",
      DEBUG_TITLE: "Debug",
      DEBUG_VALUE: "Clusters: {clusters}\nShards: {shards}\nShardID: {shardId}\nClusterID: {clusterId}",
      DESCRIPTION: "{username} is a Discord bot that provides information about Diablo 4 developed by glazk0 & Marco.",
    },
    SETTINGS: {
      TITLE: "Your server notifications settings",
      VALUE: "Channel: {channel}\nRole: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Invalid query.",
    NO_DATE_FOUND: "No date found.",
    NO_PLAYED_TIME: "No played time found.",
    NO_EQUIPPED_ITEMS: "No equipped items found.",
  },
} satisfies BaseTranslation;

export default en;
