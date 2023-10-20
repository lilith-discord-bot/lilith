import { readdirSync } from "node:fs";
import { join, resolve } from "node:path";

import { Collection, Events } from "discord.js";
import { container } from "tsyringe";

import { Client } from "../structures/Client";
import { Interaction } from "../structures/Interaction";

import { initLocales } from "../i18n";
import { clientSymbol } from "../utils/Constants";

export default class InteractionHandler {
  /**
   * The client.
   * @readonly
   */
  private readonly client: Client;
  /**
   * The interactions collection.
   *
   * @type {Collection<string, Interaction>}
   * @readonly
   */
  public readonly interactions: Collection<string, Interaction>;

  constructor() {
    this.client = container.resolve<Client>(clientSymbol);

    this.interactions = new Collection<string, Interaction>();
  }

  /**
   * Initializes the interaction handler.
   */
  public async init(): Promise<void> {
    await initLocales();

    const dir = readdirSync(join(resolve("interactions")));

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

    this.client.logger.info(`Loaded ${this.interactions.size} interactions.`);

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
}
