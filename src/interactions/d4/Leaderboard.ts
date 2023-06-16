import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CommandInteraction,
} from "discord.js";

import { Context, Interaction } from "../../core/Interaction";

import { leaderboardEmbed } from "../../utils/embeds/LeaderboardEmbed";
import { classesChoices, modesChoices } from "../../utils/Constants";

import { getLeaderboard } from "../../lib/API";

export default class Leaderboard extends Interaction {
  static enabled = true;

  static command: ApplicationCommandData = {
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

  static async run(interaction: CommandInteraction, ctx: Context): Promise<any> {
    const { options } = interaction;

    const classe = options.get("class")?.value as any;
    const mode = options.get("mode")?.value as any;

    const res = await getLeaderboard(classe, mode);

    const embed = new leaderboardEmbed(res);

    await interaction.reply({ embeds: [embed] });
  }
}
