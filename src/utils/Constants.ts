import {
  ActivityType,
  ClientOptions,
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
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildScheduledEvents,
  ],
  partials: [Partials.Channel, Partials.GuildScheduledEvent],
  presence: presence,
  allowedMentions: {
    repliedUser: false,
  },
};

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
