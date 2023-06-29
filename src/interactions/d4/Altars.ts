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

export default class Altars extends Interaction {
  public readonly enabled = true;

  public readonly category = "Diablo 4";

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "altars",
    description: "Displays information about Lilith's Altars.",
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "show",
        description: "The region to show.",
        required: true,
        choices: [
          {
            name: "Full Map",
            value: "fullmap",
          },
          {
            name: "Full Map & Pathing",
            value: "fullmap-route",
          },
          {
            name: "Scosglen",
            value: "scosglen",
          },
          {
            name: "Dry Steppes",
            value: "drysteppes",
          },
          {
            name: "Kehjistan",
            value: "kehjistan",
          },
          {
            name: "Hawezar",
            value: "hawezar",
          },
          {
            name: "Fractured Peaks",
            value: "fracturedpeaks",
          },
        ],
      },
    ],
  };

  public async run(interaction: ChatInputCommandInteraction<CacheType>): Promise<InteractionResponse<boolean>> {
    const choice = interaction.options.getString("show", true);
    return await interaction.reply(`${CDN}/map_data/altars/${choice}.png`);
  }
}
