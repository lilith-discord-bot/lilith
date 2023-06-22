import {
  ActionRowBuilder,
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ChatInputCommandInteraction,
  InteractionResponse,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../core/Client";
import { Interaction } from "../../core/Interaction";

import { getPlayer, getPlayerArmory } from "../../lib/API";

import { PlayerArmory } from "../../types";

import { getArmoryLink } from "../../utils/Commons";
import { clientSymbol } from "../../utils/Constants";
import { ArmoryEmbed } from "../../utils/embeds/ArmoryEmbed";

const armoryLink = (battleTag: string, heroId: string) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setURL(getArmoryLink(battleTag, heroId)).setLabel("See armory").setStyle(ButtonStyle.Link)
  );

@injectable()
export default class Armory extends Interaction {
  public readonly enabled: boolean = true;

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "armory",
    description: "Displays the armory of a given player.",
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "player",
        description: "The player to get the armory of.",
        required: true,
        autocomplete: true,
      },
    ],
  };

  constructor(@inject(clientSymbol) private client: Client) {
    super();
  }

  public async run(interaction: ChatInputCommandInteraction<CacheType>): Promise<InteractionResponse<boolean>> {
    let player = interaction.options.getString("player", true);

    if (!player) return await interaction.reply("No player/character provided.");

    const regex = new RegExp("^[a-zA-Z0-9]+#[0-9]{4,}$|^[0-9]{1,}$|^[a-zA-Z0-9]+-[0-9]{4,}$");

    if (!regex.test(player))
      return await interaction.reply(
        "Invalid player provided. Please use the following format: `Player#1234` or `12242223244`."
      );

    player = player.replace("#", "-");

    let res = await getPlayer(player);

    if (!res) return await interaction.reply("No player found. Please try again later.");

    if (!res.characters || res.characters.length <= 0)
      return await interaction.reply("No characters found for this player.");

    const cached = await this.client.cache.get(`players:${player}`);

    if (!cached) {
      const playerObj = {
        battleTag: player,
        name: res.characters.sort((a, b) => b.level - a.level)[0].name,
        characters: res.characters.map((character) => character.name),
      };

      await this.client.cache.set(`players:${player}`, JSON.stringify(playerObj));
    }

    let character: PlayerArmory | null = null;

    if (res.characters.length <= 1) {
      character = await getPlayerArmory(player, res.characters[0].id);

      if (!character) return await interaction.reply("No character found. Please try again later.");

      const embed = new ArmoryEmbed(character);

      return await interaction.reply({
        embeds: [embed],
        components: [armoryLink(player, res.characters[0].id)],
      });
    } else {
      const characters = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("armory_character_select")
          .setPlaceholder("Select a character")
          .addOptions(
            res.characters.map((character) => ({
              label: `${character.name} - ${character.class} (${character.level})`,
              value: `${player.replace("#", "-")}_${character.id}`,
            }))
          )
      );

      return await interaction.reply({
        content: "This player has multiple characters. Please select one.",
        components: [characters],
      });
    }
  }

  public async autocomplete(interaction: AutocompleteInteraction<CacheType>): Promise<any> {
    const value = interaction.options.getFocused();

    let keys = await this.client.cache.keys("players:*");

    if (!keys || keys.length <= 0) return await interaction.respond([]);

    let choices;

    choices = await Promise.all(
      keys.map(async (key) => {
        const player = await this.client.cache.get(key);

        const parsed = JSON.parse(player!) as {
          battleTag: string;
          name: string;
          characters: string[];
        };

        return {
          name: `${parsed.name} (${(parsed.characters && parsed.characters.length) || 0} characters)`,
          value: parsed.battleTag,
        };
      })
    );

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
          name: `"${value}" isn't currently tracked, send to track it.`,
          value: value,
        },
      ]);

    await interaction.respond(choices);
  }

  public async selectMenu(interaction: StringSelectMenuInteraction<CacheType>): Promise<any> {
    const [player, characterId] = interaction.values[0].split("_");

    const character = await getPlayerArmory(player, characterId);

    if (!character) return await interaction.reply("No character found for this player.");

    const embed = new ArmoryEmbed(character);

    await interaction.update({
      content: null,
      embeds: [embed],
      components: [armoryLink(player, characterId)],
    });
  }
}
