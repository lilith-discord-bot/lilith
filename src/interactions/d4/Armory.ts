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
  Message,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client";
import { Context, Interaction } from "../../structures/Interaction";

import { getPlayer, getPlayerArmory } from "../../lib/API";

import { PlayerArmory } from "../../types";

import { ArmoryEmbed } from "../../embeds/ArmoryEmbed";
import { commands } from "../../i18n";
import { getArmoryLink } from "../../utils/Commons";
import { clientSymbol } from "../../utils/Constants";

const armoryLink = (battleTag: string, heroId: string) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setURL(getArmoryLink(battleTag, heroId)).setLabel("See armory").setStyle(ButtonStyle.Link)
  );

@injectable()
export default class Armory extends Interaction {
  public readonly enabled: boolean = true;

  public readonly category = "Diablo 4";

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    ...commands["armory"],
    options: [
      {
        type: ApplicationCommandOptionType.String,
        ...commands["armory.player"],
        required: true,
        autocomplete: true,
      },
    ],
  };

  constructor(@inject(clientSymbol) private client: Client) {
    super();
  }

  public async run(
    interaction: ChatInputCommandInteraction<CacheType>,
    { i18n, guild }: Context
  ): Promise<Message<boolean>> {
    let player = interaction.options.getString("player", true);

    await interaction.deferReply();

    const regex = new RegExp("^[a-zA-Z0-9]+#[0-9]{4,}$|^[0-9]{1,}$|^[a-zA-Z0-9]+-[0-9]{4,}$");

    if (!regex.test(player)) return await interaction.editReply(i18n.armory.BAD_FORMAT());

    player = player.replace("#", "-");

    let res = await getPlayer(player);

    if (!res) return await interaction.editReply(i18n.armory.PLAYER_NOT_FOUND({ player }));

    // Error means the player is in the queue or private
    if (res.error) return await interaction.editReply(i18n.armory.ERROR({ player }));

    if (!res.characters || res.characters.length <= 0) return await interaction.editReply(i18n.armory.NO_CHARACTERS());

    const cached = await this.client.cache.get(`players:${player}`);

    if (!cached) {
      const playerObj = {
        battleTag: player,
        name: player.split("-")[0],
        characters: res.characters.map((character) => character.name),
      };
      await this.client.cache.set(`players:${player}`, JSON.stringify(playerObj));
    }

    let character: PlayerArmory | null = null;

    if (res.characters.length <= 1) {
      character = await getPlayerArmory(player, res.characters[0].id);

      if (!character) return await interaction.editReply(i18n.armory.NO_CHARACTER());

      if (character.error) return await interaction.editReply(i18n.armory.ERROR({ player }));

      const embed = new ArmoryEmbed(character, { i18n, guild });

      return await interaction.editReply({
        embeds: [embed],
        components: [armoryLink(player, res.characters[0].id)],
      });
    } else {
      const characterList = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("armory_character_select")
          .setPlaceholder(i18n.armory.SELECT_CHARACTER())
          .addOptions(
            res.characters.map((character) => ({
              label: `${character.name} - ${character.class} (${character.level})`,
              value: `${player.replace("#", "-")}_${character.id}`,
            }))
          )
      );

      return await interaction.editReply({
        content: i18n.armory.MULTIPLE_CHARACTERS(),
        components: [characterList],
      });
    }
  }

  public async autocomplete(interaction: AutocompleteInteraction<CacheType>, { i18n }: Context): Promise<any> {
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
          name: i18n.armory.PLAYER_CHOICE({
            name: parsed.name,
            characters: (parsed.characters && parsed.characters.length) || 0,
          }),
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
          name: i18n.armory.NOT_TRACKED_YET({ player: value }),
          value: value,
        },
      ]);

    await interaction.respond(choices);
  }

  public async selectMenu(interaction: StringSelectMenuInteraction<CacheType>, { i18n, guild }: Context): Promise<any> {
    const [player, characterId] = interaction.values[0].split("_");

    const character = await getPlayerArmory(player, characterId);

    if (!character) return await interaction.reply(i18n.armory.NO_CHARACTER());

    if (character.error) return await interaction.reply(i18n.armory.ERROR({ player }));

    const embed = new ArmoryEmbed(character, { i18n, guild });

    await interaction.update({
      content: null,
      embeds: [embed],
      components: [armoryLink(player, characterId)],
    });
  }
}
