import {
  ApplicationCommandData,
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
  StringSelectMenuInteraction,
} from "discord.js";

import { Client } from "./Client";
import { Guild } from "../types/Database";

export type Context = {
  client: Client;
  guild: Guild | null;
};

export class Interaction {
  /**
   * Whether the interaction is enabled.
   * @type {boolean}
   */
  static enabled: boolean = true;

  /**
   * The command data.
   * @type {ApplicationCommandData}
   */
  static command: ApplicationCommandData;

  /**
   * Runs the interaction.
   *
   * @param interaction - The interaction.
   * @param context - The context.
   *
   * @returns {Promise<void>}
   */
  static async run(interaction: ChatInputCommandInteraction<CacheType>, context: Context): Promise<any> {}

  /**
   * Handles the interaction autocomplete.
   *
   * @param interaction - The interaction.
   * @param context - The context.
   */
  static async autocomplete?(interaction: AutocompleteInteraction<CacheType>, context: Context): Promise<any> {}

  /**
   * Handles the interaction select menu.
   *
   * @param interaction - The interaction.
   * @param context - The context.
   */
  static async selectMenu?(interaction: StringSelectMenuInteraction<CacheType>, context: Context): Promise<any> {}
}
