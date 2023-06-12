import {
  ActivityType,
  ClientOptions,
  GatewayIntentBits,
  IntentsBitField,
  Partials,
  PresenceData,
} from 'discord.js';

import { ClassesChoices, ModesChoices } from '../types';

/**
 * Utility enum for admins.
 * @enum {string}
 */
export enum Admins {
  /** glazk0 on Discord. */
  glazk0 = '247344130798256130',
  /** Marco. AKA 4d6172636f2e2332343535 on Discord. */
  Marco = '309620533761146880',
}

/**
 * The presence data for the client.
 * @type {PresenceData}
 */
export const presence: PresenceData = {
  status: 'online',
  activities: [
    {
      name: 'hell',
      type: ActivityType.Watching,
    },
  ],
};

/**
 * The client options.
 * @type {ClientOptions}
 */
export const options: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildScheduledEvents,
  ],
  partials: [Partials.Channel, Partials.GuildScheduledEvent],
  presence: presence,
  allowedMentions: {
    repliedUser: false,
  },
};

export const eventsChoices = [
  {
    name: 'World Boss',
    value: 'boss',
  },
  {
    name: 'Hell Tide',
    value: 'helltide',
  },
  {
    name: 'Legion Invasion',
    value: 'legion',
  },
];

/**
 * The choices for the classes.
 */
export const classesChoices: ClassesChoices[] = [
  {
    name: 'Barbarian',
    value: 'Barbarian',
  },
  {
    name: 'Sorcerer',
    value: 'Sorcerer',
  },
  {
    name: 'Druid',
    value: 'Druid',
  },
  {
    name: 'Rogue',
    value: 'Rogue',
  },
  {
    name: 'Necromancer',
    value: 'Necromancer',
  },
];

/**
 * The choices for the modes.
 */
export const modesChoices: ModesChoices[] = [
  {
    name: 'All modes',
    value: 'allmodes',
  },
  {
    name: 'Softcore',
    value: 'softcore',
  },
  {
    name: 'Hardcore',
    value: 'hardcore',
  },
  {
    name: 'Hall of Valor',
    value: 'dead',
  },
  {
    name: 'PvP',
    value: 'pvp',
  },
];

export const glyphs = [
  {
    level: 1,
    xp: 0,
    total: 0,
  },
  {
    level: 2,
    xp: 8,
    total: 8,
  },
  {
    level: 3,
    xp: 15,
    total: 23,
  },
  {
    level: 4,
    xp: 24,
    total: 47,
  },
  {
    level: 5,
    xp: 35,
    total: 82,
  },
  {
    level: 6,
    xp: 46,
    total: 128,
  },
  {
    level: 7,
    xp: 59,
    total: 187,
  },
  {
    level: 8,
    xp: 72,
    total: 259,
  },
  {
    level: 9,
    xp: 87,
    total: 346,
  },
  {
    level: 10,
    xp: 104,
    total: 450,
  },
  {
    level: 11,
    xp: 121,
    total: 571,
  },
  {
    level: 12,
    xp: 140,
    total: 711,
  },
  {
    level: 13,
    xp: 159,
    total: 870,
  },
  {
    level: 14,
    xp: 180,
    total: 1050,
  },
  {
    level: 15,
    xp: 203,
    total: 1253,
  },
  {
    level: 16,
    xp: 226,
    total: 1479,
  },
  {
    level: 17,
    xp: 251,
    total: 1730,
  },
  {
    level: 18,
    xp: 276,
    total: 2006,
  },
  {
    level: 19,
    xp: 303,
    total: 2309,
  },
  {
    level: 20,
    xp: 332,
    total: 2641,
  },
  {
    level: 21,
    xp: 361,
    total: 3002,
  },
];
