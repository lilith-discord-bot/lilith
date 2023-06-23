import type { BaseTranslation } from "../i18n-types";

const es = {
  settings: {
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
  },
  events: {
    WORLD_BOSS: "{name} appears in {zone} ({territory}) at {time}.\n\nNext expected boss is {nextName} at {nextTime}",
    HELLTIDE: "Helltide occuring in {zone} until {time}, next helltide at {nextTime}\n\nChests refresh: {refresh}",
    LEGION: "Legion appears {time}, next legion at {nextTime}",
  },
  misc: {
    INVALID_QUERY: "Invalid query.",
  },
} satisfies BaseTranslation;

export default es;
