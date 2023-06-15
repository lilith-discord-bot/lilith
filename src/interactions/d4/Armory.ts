import {
  ActionRowBuilder,
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  CommandInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';

import { Context, Interaction } from '../../core/Interaction';

import { ArmoryEmbed } from '../../utils/embeds/ArmoryEmbed';

import { PlayerArmory } from '../../types';
import { getArmoryLink } from '../../utils/Commons';

const armoryLink = (battleTag: string, heroId: string) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setURL(getArmoryLink(battleTag, heroId))
      .setLabel('See armory')
      .setStyle(ButtonStyle.Link),
  );

export default class Armory extends Interaction {
  static enabled = true;

  static command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: 'armory',
    description: 'Displays the armory of a given player.',
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: 'player',
        description: 'The player to get the armory of.',
        required: true,
        autocomplete: true,
      },
    ],
  };

  static async run(
    interaction: CommandInteraction,
    ctx: Context,
  ): Promise<any> {

    const { options } = interaction;

    let player = (options.get('player')?.value || null) as string;

    if (!player)
      return await interaction.reply('No player/character provided.');

    const regex = new RegExp('^[a-zA-Z0-9]+#[0-9]{4,}$|^[0-9]{1,}$|^[a-zA-Z0-9]+-[0-9]{4,}$');

    if (!regex.test(player))
      return await interaction.reply('Invalid player provided. Please use the following format: `Player#1234` or `12242223244`.');

    player = player.replace('#', '-');

    let res = await ctx.client.api.getPlayer(player);

    if (!res)
      return await interaction.reply('No player found. Please try again later.');

    if (res.characters.length <= 0)
      return await interaction.reply('No characters found for this player.');

    const cached = await ctx.client.cache.get(`players:${player}`);

    if (!cached) {

      const playerObj = {
        battleTag: player,
        name: res.characters.sort((a, b) => b.level - a.level)[0].name,
        characters: res.characters.map((character) => character.name)
      }

      await ctx.client.cache.set(`players:${player}`, JSON.stringify(playerObj));
    }

    let character: PlayerArmory | null = null;

    if (res.characters.length <= 1) {

      character = await ctx.client.api.getPlayerArmory(player, res.characters[0].id);

      if (!character)
        return await interaction.reply('No character found. Please try again later.');

      const embed = new ArmoryEmbed(character, ctx);

      await interaction.reply({
        embeds: [embed],
        components: [armoryLink(player, res.characters[0].id)],
      });

    } else {

      const characters =
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('armory_character_select')
            .setPlaceholder('Select a character')
            .addOptions(
              res.characters.map((character) => ({
                label: `${character.name} - ${character.class} (${character.level})`,
                value: `${player.replace('#', '-')}_${character.id}`,
              })),
            ),
        );

      await interaction.reply({
        content: 'This player has multiple characters. Please select one.',
        components: [characters],
      });
    }
  }

  static async autocomplete(
    interaction: AutocompleteInteraction,
    ctx: Context,
  ): Promise<any> {
    const value = interaction.options.getFocused();

    let keys = await ctx.client.cache.keys('players:*');

    if (!keys || keys.length <= 0) return await interaction.respond([]);

    let choices;

    choices = await Promise.all(keys.map(async (key) => {

      const player = await ctx.client.cache.get(key);

      const parsed = JSON.parse(player!) as {
        battleTag: string;
        name: string;
        characters: string[];
      };

      if (parsed.name.length > 15)
        parsed.name = parsed.name.substring(0, 15) + '...';

      return {
        name: `${parsed.name} (${parsed.characters && parsed.characters.length || 0} chars.)`,
        value: parsed.battleTag,
      };
    })).then((choices) => choices.filter((choice) => choice.name.length > 1 && choice.name.length <= 100));

    choices = [
      ...(choices?.filter((player) => {
        return player.name.toLowerCase().indexOf(value.toLowerCase()) === 0;
      }) as any),
      ...(choices?.filter((player) => {
        return player.name.toLowerCase().indexOf(value.toLowerCase()) > 0;
      }) as any),
    ];

    choices = choices?.slice(0, 10);

    if (choices.length <= 0)
      return await interaction.respond([
        {
          name: `Player "${value}" isn't cached yet or isn't linked. Sending this request will try to reach and cache it.`,
          value: value,
        },
      ]);

    await interaction.respond(choices);
  }

  static async selectMenu(
    interaction: StringSelectMenuInteraction<CacheType>,
    context: Context,
  ): Promise<any> {

    const [player, characterId] = interaction.values[0].split('_');

    const character = await context.client.api.getPlayerArmory(
      player,
      characterId,
    );

    if (!character)
      return await interaction.reply('No character found for this player.');

    const embed = new ArmoryEmbed(character, context);

    await interaction.update({
      content: null,
      embeds: [embed],
      components: [armoryLink(player, characterId)],
    });
  }
}
