import {
  ActivityType,
  ClientOptions,
  IntentsBitField,
  Partials,
  PresenceData,
} from 'discord.js';

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
