import { readdirSync } from "node:fs";
import { join, resolve } from "node:path";

import { CacheType, Collection, CommandInteraction, Events, REST, Routes, StringSelectMenuInteraction } from "discord.js";
import { container } from "tsyringe";

import { Event } from "../core/Event";
import { Context, Interaction } from "../core/Interaction";

import L from "../i18n/i18n-node";

import { Guild } from "../types/Database";

export default class InteractionHandler extends Event {
  /**
   * The interactions collection.
   *
   * @type {Collection<string, Interaction>}
   * @readonly
   */
  private readonly interactions: Collection<string, Interaction>;

  constructor() {
    super("onInteraction", Events.InteractionCreate);

    this.interactions = new Collection<string, Interaction>();

    this.init();
  }

  /**
   * Initializes the interaction handler.
   */
  async init(): Promise<void> {
    const dir = readdirSync(join(resolve("interactions")));

    this.client.logger.info(`Loading ${dir.length} interactions categories.`);

    for (const category of dir) {
      const files = readdirSync(join(resolve("interactions", category)));

      this.client.logger.info(`Loading ${files.length} interactions from category ${category}.`);

      for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const commandClass = (await import(join(resolve(), "interactions", category, file))).default;
        const interaction = container.resolve<Interaction>(commandClass);
        this.client.logger.info(`Loading interaction ${interaction.command.name}.`);
        this.interactions.set(interaction.command.name, interaction);
      }
    }

    this.client.setInteractions(this.interactions);

    this.refresh();
  }

  /**
   * Refreshes the interactions.
   * This will update the interactions on Discord.
   */
  private async refresh() {
    const ready = this.client.readyAt
      ? Promise.resolve()
      : new Promise((resolve) => this.client.once(Events.ClientReady, resolve));

    await ready;

    const currentInteractions = await this.client.application.commands.fetch();

    this.client.logger.info("Synchronizing interactions.");

    const interactions = this.interactions
      .filter((interaction) => interaction.enabled)
      .map((interaction) => interaction.command);

    const newInteractions = interactions.filter(
      (interaction) => !currentInteractions.some((i) => i.name === interaction.name)
    );

    for (let newInteraction of newInteractions) {
      await this.client.application.commands.create(newInteraction);
    }

    if (newInteractions.length > 0) this.client.logger.info(`Created ${newInteractions.length} interaction(s).`);

    const deletedInteractions = currentInteractions
      .filter((interaction) => !interactions.some((i) => i.name === interaction.name))
      .toJSON();

    for (let deletedInteraction of deletedInteractions) {
      await deletedInteraction.delete();
    }

    if (deletedInteractions.length > 0) this.client.logger.info(`Deleted ${deletedInteractions.length} interaction(s).`);

    const updatedInteractions = interactions.filter((interaction) =>
      currentInteractions.some((i) => i.name === interaction.name)
    );

    let updatedInteractionsCount = 0;

    for (let updatedInteraction of updatedInteractions) {
      const newInteraction = updatedInteraction;
      const previousInteraction = currentInteractions.find((i) => i.name === updatedInteraction.name);
      let modified = false;
      if (previousInteraction.name !== newInteraction.name) modified = true;
      if (previousInteraction.defaultMemberPermissions !== newInteraction.defaultMemberPermissions) modified = true;
      if (previousInteraction.dmPermission !== newInteraction.dmPermission) modified = true;
      if (modified) {
        await previousInteraction.edit(newInteraction);
        updatedInteractionsCount++;
      }
    }

    if (updatedInteractionsCount > 0) this.client.logger.info(`Updated ${updatedInteractionsCount} interaction(s).`);

    this.client.logger.info("Interactions synchronized.");

    // const rest = new REST().setToken(process.env.TOKEN);

    // try {
    //   this.client.logger.info(`Started refreshing ${this.interactions.size} application (/) commands.`);

    //   const data = (await rest.put(Routes.applicationCommands(this.client.user.id), {
    //     body: this.interactions.filter((interaction) => interaction.enabled).map((interaction) => interaction.command),
    //   })) as any;

    //   this.client.logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
    // } catch (error) {
    //   this.client.logger.error(`Failed to reload application (/) commands: ${error}`);
    // }
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
      command = this.interactions.get(interaction.commandName);
      if (!this.interactions.has(interaction.commandName)) return undefined;
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

      if (!this.interactions.has(id)) return undefined;

      command = this.interactions.get(id);

      if (!command) return undefined;

      try {
        await command.selectMenu?.(interaction, context);
      } catch (error) {
        this.client.logger.error(`Failed to run interaction ${selectMenu.customId}: ${error}`);
      }
    }
  }
}
