import { ActivityType, ClientOptions, GatewayIntentBits, Locale, Partials, PresenceData } from "discord.js";

import { ClassesChoices, ModesChoices } from "../types";

/**
 * Our CDN.
 * @type {string}
 */
export const CDN = "https://s3.glazk0.dev/lilith";

/**
 * The bot invite link.
 * @type {string}
 */
export const BOT_INVITE = "https://lilith.mom/invite";

/**
 * The support server invite link.
 * @type {string}
 */
export const SUPPORT_SERVER = "https://discord.gg/Mv2yCrJK87";

/**
 * D4 Armory URL, thanks to @Shalzuth
 * @type {string}
 */
export const ARMORY_URL = "https://d4armory.io";

/**
 * D4 Armory API URL, thanks to @Shalzuth
 * @type {string}
 */
export const ARMORY_API_URL = "https://d4armory.io/api";

/**
 * The url of the Diablo 4 Database.
 * @type {string}
 */
export const DATABASE_URL = "https://diablo4.cc";

/**
 * The url of the @DevLeon map.
 * @type {string}
 */
export const MAP_URL = "https://diablo4.th.gl";

/**
 * The url of the @DevLeon map API.
 * @type {string}
 */
export const MAP_API_URL = "https://diablo4.th.gl/api/nodes";

/**
 * The client symbol for the container.
 * @type {symbol}
 */
export const clientSymbol = Symbol("client");
/**
 * Utility enum for admins.
 * @enum {string}
 */
export enum Admins {
  /** glazk0 on Discord. */
  glazk0 = "247344130798256130",
  /** Marco. AKA 4d6172636f2e2332343535 on Discord. */
  Marco = "309620533761146880",
}

/**
 * The presence data for the client.
 * @type {PresenceData}
 */
export const presence: PresenceData = {
  status: "online",
  activities: [
    {
      name: "hell",
      type: ActivityType.Watching,
    },
  ],
};

/**
 * The client options.
 * @type {ClientOptions}
 */
export const options: ClientOptions = {
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildScheduledEvents],
  partials: [Partials.Channel, Partials.GuildScheduledEvent],
  presence: presence,
  allowedMentions: {
    repliedUser: false,
    parse: ["roles", "everyone"],
  },
};

/**
 * The choices for the events.
 */
export const eventsChoices = [
  {
    name: "World Boss",
    value: "boss",
  },
  {
    name: "Hell Tide",
    value: "helltide",
  },
  {
    name: "Legion Invasion",
    value: "legion",
  },
];

/**
 * The choices for the classes.
 */
export const classesChoices: ClassesChoices[] = [
  {
    name: "Barbarian",
    value: "Barbarian",
  },
  {
    name: "Sorcerer",
    value: "Sorcerer",
  },
  {
    name: "Druid",
    value: "Druid",
  },
  {
    name: "Rogue",
    value: "Rogue",
  },
  {
    name: "Necromancer",
    value: "Necromancer",
  },
];

/**
 * The choices for the modes.
 */
export const modesChoices: ModesChoices[] = [
  {
    name: "All modes",
    value: "allmodes",
  },
  {
    name: "Softcore",
    value: "softcore",
  },
  {
    name: "Hardcore",
    value: "hardcore",
  },
  {
    name: "Hall of Valor",
    value: "dead",
  },
  {
    name: "PvP",
    value: "pvp",
  },
];

/**
 * The differents languages of D4 DB.
 */
export const languages = ["us", "tw", "cn", "kr", "jp", "ru", "de", "fr", "es", "br", "mx", "it", "pl"];

/**
 * Match Discord locales to D4 DB languages.
 * @type {Record<Locale, string>}
 */
export const discordToLanguage = {
  "en-US": "us",
  "en-GB": "us",
  "zh-CN": "cn",
  "zh-TW": "tw",
  fr: "fr",
  de: "de",
  it: "it",
  ja: "jp",
  ko: "kr",
  pl: "pl",
  "pt-BR": "br",
  ru: "ru",
  "es-ES": "es",
} as Record<Locale, string>;

/**
 * List of Discord locales.
 * @type {Locale[]}
 */
export const DiscordLocales = [
  "vi",
  "da",
  "he",
  "zh-TW",
  "ja",
  "th",
  "hi",
  "ru",
  "pl",
  "fr",
  "lt",
  "en-GB",
  "pt-BR",
  "it",
  "cs",
  "bg",
  "hr",
  "tr",
  "hu",
  "ro",
  "ar",
  "de",
  "ko",
  "el",
  "en-US",
  "no",
  "sv-SE",
  "uk",
  "zh-CN",
  "nl",
  "es-ES",
  "fi",
] as Locale[];

/**
 * Match short locales to Discord locales.
 * @type {Record<string, Locale>}
 */
export const LocalDiscordLocaleMappings = {
  en: "en-US",
  es: "es-ES",
  pt: "pt-BR",
} as Record<string, Locale>;

/**
 * Lilith locales to their full name.
 * @type {Record<string, string>}
 */
export const localesMap = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  ja: "日本語",
  pt: "Português",
  es: "Español",
  pl: "Polski",
  hu: "Magyar",
  bg: "български",
} as Record<string, string>;
