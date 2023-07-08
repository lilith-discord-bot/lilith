import {
  ApplicationCommandData,
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
  InteractionResponse,
  Message,
  StringSelectMenuInteraction,
} from "discord.js";

import { TranslationFunctions } from "../i18n/i18n-types";

import { Guild } from "../types/Database";

export type Context = {
  i18n: TranslationFunctions;
  guild: Guild | null;
};

export abstract class Interaction implements InteractionInterface {
  /**
   * Whether the interaction is enabled.
   * @type {boolean}
   */
  public readonly enabled: boolean = true;

  /**
   * The interaction category.
   */
  public readonly category: string = "Other";

  /**
   * The command data.
   * @type {ApplicationCommandData}
   */
  public readonly command: ApplicationCommandData;

  /**
   * Runs the interaction.
   *
   * @param interaction - The interaction.
   * @param context - The context.
   *
   * @returns {Promise<void>}
   */
  public async run(
    interaction: ChatInputCommandInteraction<CacheType>,
    context: Context
  ): Promise<InteractionResponse<boolean> | Message<boolean>> {
    throw new Error(`Command ${this.command.name} not implemented.`);
  }

  /**
   * Handles the interaction autocomplete.
   *
   * @param interaction - The interaction.
   * @param context - The context.
   */
  public async autocomplete?(interaction: AutocompleteInteraction<CacheType>, context: Context): Promise<any> {}

  /**
   * Handles the interaction select menu.
   *
   * @param interaction - The interaction.
   * @param context - The context.
   */
  public async selectMenu?(interaction: StringSelectMenuInteraction<CacheType>, context: Context): Promise<any> {}
}

export interface InteractionInterface {
  readonly enabled: boolean;
  readonly category: string;
  readonly command: ApplicationCommandData;
  run(interaction: ChatInputCommandInteraction<CacheType>, context: Context): Promise<any>;
  autocomplete?(interaction: AutocompleteInteraction<CacheType>, context: Context): Promise<any>;
  selectMenu?(interaction: StringSelectMenuInteraction<CacheType>, context: Context): Promise<any>;
}
