import { CacheType, CommandInteraction, Events, StringSelectMenuInteraction } from "discord.js";

import { Event } from "../structures/Event";
import { Context, Interaction } from "../structures/Interaction";

import L from "../i18n/i18n-node";

import { Guild } from "../types/Database";

export default class InteractionCreate extends Event {
  constructor() {
    super("onInteraction", Events.InteractionCreate);
  }

  /**
   * Runs the interaction.
   *
   * @param interaction - The interaction.
   *
   * @returns {Promise<void>} - Returns nothing.
   */
  async run(interaction: CommandInteraction<CacheType>): Promise<any> {
    if (!this.client.isReady) return undefined;
    if (!interaction) return undefined;

    let guild = null as Guild | null;

    if (interaction.inGuild()) guild = await this.client.repository.guild.findOrCreate(interaction.guildId);

    let context = {} as Context;

    context.i18n = L[(guild && guild.locale) || "en"];
    context.guild = guild;

    let command = null as Interaction | null;

    if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
      command = this.client.interactions.get(interaction.commandName);
      if (!this.client.interactions.has(interaction.commandName)) return undefined;
    }

    if (interaction.isChatInputCommand()) {
      this.client.logger.info(`Command ${command.command.name} was executed in ${interaction.guildId || "DM"}`);

      try {
        await command.run(interaction, context);
      } catch (error) {
        this.client.logger.error(`Failed to run interaction ${interaction.commandName}: ${error}`);
      }
    }

    if (interaction.isAutocomplete()) {
      try {
        await command.autocomplete?.(interaction, context);
      } catch (error) {
        this.client.logger.error(`Failed to run autocomplete for interaction ${command.command.name}: ${error}`);
      }
    }

    if (interaction.isStringSelectMenu()) {
      const selectMenu = interaction as StringSelectMenuInteraction;

      const id = selectMenu.customId.split("_")[0];

      if (!this.client.interactions.has(id)) return undefined;

      command = this.client.interactions.get(id);

      if (!command) return undefined;

      try {
        await command.selectMenu?.(interaction, context);
      } catch (error) {
        this.client.logger.error(`Failed to run interaction ${selectMenu.customId}: ${error}`);
      }
    }
  }
}
