import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CacheType,
  ChatInputCommandInteraction,
  InteractionResponse,
} from "discord.js";

import { Context, Interaction } from "../../core/Interaction";

import { classesChoices, modesChoices } from "../../utils/Constants";
import { leaderboardEmbed } from "../../embeds/LeaderboardEmbed";

import { getLeaderboard } from "../../lib/API";

export default class Leaderboard extends Interaction {
  public readonly enabled = false;

  public readonly category = "Diablo 4";

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "leaderboard",
    description: "Displays the leaderboard for a given class and mode.",
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "class",
        description: "The class to get the leaderboard of.",
        choices: classesChoices,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: "mode",
        description: "The mode to get the leaderboard of.",
        choices: modesChoices,
      },
    ],
  };

  public async run(interaction: ChatInputCommandInteraction<CacheType>): Promise<InteractionResponse<boolean>> {
    const classe = interaction.options.getString("class", true) as any;
    const mode = interaction.options.getString("mode", true) as any;

    const res = await getLeaderboard(classe, mode);

    const embed = new leaderboardEmbed(res);

    return await interaction.reply({ embeds: [embed] });
  }
}
