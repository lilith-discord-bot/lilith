import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CacheType,
  ChatInputCommandInteraction,
  InteractionResponse,
} from "discord.js";

import { Interaction } from "../../structures/Interaction";

import { CDN } from "../../utils/Constants";

export default class Chart extends Interaction {
  public readonly enabled = true;

  public readonly category = "Diablo 4";

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "chart",
    description: "Displays a specific chart.",
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "show",
        description: "The chart to show.",
        required: true,
        choices: [
          {
            name: "Glyph XP",
            value: "glyph_xp",
          },
          {
            name: "XP",
            value: "xp_101",
          },
          {
            name: "Sigil Farm",
            value: "sigil_farm",
          },
          {
            name: "Nightmare Affixes",
            value: "nightmare_affixes",
          },
          {
            name: "Map",
            value: "blank_map",
          },
        ],
      },
    ],
  };

  public async run(interaction: ChatInputCommandInteraction<CacheType>): Promise<InteractionResponse<true>> {
    const choice = interaction.options.getString("show", true);
    return await interaction.reply(`${CDN}/game_data/charts_graphs/${choice}.png`);
  }
}
