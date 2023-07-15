import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CacheType,
  ChatInputCommandInteraction,
  InteractionResponse,
} from "discord.js";

import { Embed } from "../../embeds/Embed";
import { commands } from "../../i18n";
import { Interaction } from "../../structures/Interaction";
import { CDN } from "../../utils/Constants";

export default class Season extends Interaction {
  public readonly enabled = false;

  public readonly category = "Diablo 4";

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    ...commands["season"],
    options: [
      {
        type: ApplicationCommandOptionType.String,
        ...commands["season.get"],
        required: true,
        choices: [
          {
            name: "Glyph XP Chart",
            value: "glyph-xp",
          },
          {
            name: "Seasonal Map",
            value: "season-map",
          },
          {
            name: "Malignant Heart Chart",
            value: "malignant-chart",
          },
          {
            name: "Nightmare Dungeon Farming",
            value: "nightmare-farm",
          },
          {
            name: "Season Pass Rewards",
            value: "season-pass",
          },
          {
            name: "Season Overview",
            value: "season-one",
          },
          {
            name: "Seasonal Blessings Chart",
            value: "blessings",
          },
          {
            name: "XP Requirement Chart",
            value: "xp-chart",
          },
        ],
      },
    ],
  };

  public async run(interaction: ChatInputCommandInteraction<CacheType>): Promise<InteractionResponse<boolean>> {
    const choice = interaction.options.getString("show", true);

    const embed = new Embed().setImage(`${CDN}/game_data/seasonal/${choice}.png`);

    return await interaction.reply({
      embeds: [embed],
    });
  }
}
