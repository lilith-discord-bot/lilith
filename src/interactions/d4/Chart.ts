import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CacheType,
  ChatInputCommandInteraction,
} from "discord.js";

import { Interaction } from "../../core/Interaction";

import { CDN } from "../../utils/Constants";

export default class Chart extends Interaction {
  static enabled = true;

  static command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "chart",
    description: "Displays a specific chart.",
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "get",
        description: "The chart to get.",
        required: true,
        choices: [
          {
            name: "Glyph XP",
            value: "glyph",
          },
          {
            name: "XP",
            value: "xp",
          },
          {
            name: "Sigil Farm",
            value: "sigil",
          },
          {
            name: "Nightmare Affixes",
            value: "nightmare",
          },
          {
            name: "Map",
            value: "map",
          },
        ],
      },
    ],
  };

  static async run(interaction: ChatInputCommandInteraction<CacheType>): Promise<any> {
    const option = interaction.options.get("get")?.value;

    switch (option) {
      case "glyph":
        await interaction.reply(`${CDN}/game_data/charts_graphs/glyph_xp.png`);
        break;
      case "xp":
        await interaction.reply(`${CDN}/game_data/charts_graphs/xp_101.png`);
        break;
      case "sigil":
        await interaction.reply(`${CDN}/game_data/charts_graphs/sigil_farm.png`);
        break;
      case "nightmare":
        await interaction.reply(`${CDN}/game_data/charts_graphs/nightmare_affixes.png`);
        break;
      case "map":
        await interaction.reply(`${CDN}/game_data/charts_graphs/blank_map.png`);
        break;
      default:
        await interaction.reply("Invalid chart.");
        break;
    }
  }
}
