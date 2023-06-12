import fs from 'node:fs';
import path from 'node:path';

import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Collection,
  CommandInteraction,
  Events,
  StringSelectMenuInteraction,
} from 'discord.js';

import { Client } from '../core/Client';
import { Event } from '../core/Event';
import { Context, Interaction } from '../core/Interaction';
// import { findOrCreateGuild } from '../lib/db/postgresql/repository/Guild';

// TODO : Refactor this, it works for now

export default class InteractionHandler extends Event {
  /**
   * The interactions collection.
   *
   * @type {Collection<string, any>}
   * @readonly
   */
  readonly interactions = new Collection<string, any>();

  constructor(client: Client) {
    super(client, 'onInteraction', Events.InteractionCreate);

    this.interactions = new Collection<string, any>();

    this.init();
  }

  /**
   * Initializes the interaction handler.
   *
   * @returns {Promise<void>} - Returns nothing.
   */
  async init(): Promise<void> {
    const dir = path.join(__dirname, '..', 'interactions');

    let loadedCommands = [];

    let files = await fs.readdirSync(dir);

    if (!files) return;

    const categories = files.filter?.((file) => !file.endsWith('.js'));

    categories.forEach((category) => {
      files = files.concat(
        fs
          .readdirSync(path.join(dir, category))
          .map((file) => path.join(path.resolve(dir, category, file))),
      );
    });

    loadedCommands = (
      await Promise.all(
        files.map(async (file) => {
          if (!file.endsWith('.js')) return undefined;
          try {
            const Handler = (await import(file)).default;
            return Handler.prototype instanceof Interaction
              ? Handler
              : undefined;
          } catch (error) {
            this.client.logger.error(error);
            return undefined;
          }
        }),
      )
    ).filter((handler) => handler) as any[];

    loadedCommands
      .filter((command) => command.enabled)
      .flat()
      .filter((c) => c)
      .forEach((command) => {
        this.interactions.set(command.command.name, command);
      });

    this.create();

    this.client.logger.info(`Loaded ${this.interactions.size} interactions`);
  }

  private async create(): Promise<void> {
    const ready = this.client.readyAt
      ? Promise.resolve()
      : new Promise((resolve) => this.client.once('ready', resolve));

    await ready;

    for (const [name, command] of this.interactions) {
      try {
        await this.client.application?.commands.create(command.command);
      } catch (error) {
        this.client.logger.error(
          `Failed to load interaction ${name}: ${error}`,
        );
      }
    }
  }

  /**
   * Runs the interaction.
   *
   * @param interaction - The interaction.
   *
   * @returns {Promise<void>} - Returns nothing.
   */
  async run(interaction: CommandInteraction): Promise<any> {

    if (!this.client.isReady) return undefined;
    if (!interaction) return undefined;

    let guild = null;

    if (interaction.inGuild())
      guild = await this.client.repository.guild.findOrCreate(interaction.guildId);

    let context = {} as Context;

    context.client = this.client;
    context.guild = guild;

    if (interaction.isChatInputCommand()) {

      if (!interaction.user.id.includes('247344130798256130'))
        return await interaction.reply('The bot is still in development, we will let you know when it is ready!');
      
      if (!this.interactions.has(interaction.commandName)) return undefined;

      const command = this.interactions.get(interaction.commandName);

      if (!command) return undefined;

      try {
        await command.run?.(interaction, context);
      } catch (error) {
        this.client.logger.error(
          `Failed to run interaction ${interaction.commandName}: ${error}`,
        );
      }
    }

    if (interaction.isAutocomplete()) {
      const autocomplete = interaction as AutocompleteInteraction;

      if (!this.interactions.has(autocomplete.commandName)) return undefined;

      const command = this.interactions.get(autocomplete.commandName);

      if (!command) return undefined;

      try {
        await command.autocomplete?.(interaction, context);
      } catch (error) {
        this.client.logger.error(
          `Failed to run autocomplete for interaction ${command.name}: ${error}`,
        );
      }
    }

    if (interaction.isStringSelectMenu()) {
      const selectMenu = interaction as StringSelectMenuInteraction;

      const id = selectMenu.customId.split('_')[0];

      if (!this.interactions.has(id)) return undefined;

      const command = this.interactions.get(id);

      if (!command) return undefined;

      try {
        await command.selectMenu?.(interaction, context);
      } catch (error) {
        this.client.logger.error(
          `Failed to run interaction ${selectMenu.customId}: ${error}`,
        );
      }
    }
  }
}
