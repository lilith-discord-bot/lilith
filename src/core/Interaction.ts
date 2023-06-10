import {
  ApplicationCommandData,
  AutocompleteInteraction,
  CommandInteraction,
  InteractionResponse,
  StringSelectMenuInteraction,
} from 'discord.js';
import { Client } from './Client';

export type Context = {
  client: Client;
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
  static async run(
    interaction: CommandInteraction,
    context: Context,
  ): Promise<any> {}

  /**
   * Handles the interaction autocomplete.
   *
   * @param interaction - The interaction.
   * @param context - The context.
   */
  static async autocomplete(
    interaction: AutocompleteInteraction,
    context: Context,
  ): Promise<any> {}

  /**
   * Handles the interaction select menu.
   *
   * @param interaction - The interaction.
   * @param context - The context.
   */
  static async selectMenu(
    // TODO ADD MORE OR MAKE IT GENERIC
    interaction: StringSelectMenuInteraction,
    context: Context,
  ): Promise<any> {}
}
