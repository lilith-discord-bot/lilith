import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
  CommandInteraction,
} from 'discord.js';

import { Context, Interaction } from '../../core/Interaction';
import { classesChoices, modesChoices } from '../../lib/API';
import { leaderboardEmbed } from '../../lib/embeds/LeaderboardEmbed';

export default class GetArmory extends Interaction {
  static enabled = true;

  static command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: 'leaderboard',
    description: 'Displays the leaderboard for a given class and mode.',
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: 'class',
        description: 'The class to get the leaderboard of.',
        choices: classesChoices,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: 'mode',
        description: 'The mode to get the leaderboard of.',
        choices: modesChoices,
      },
    ],
  };

  static async run(
    interaction: CommandInteraction,
    ctx: Context,
  ): Promise<any> {
    const { options } = interaction;

    // TODO - Change any to the correct type.
    const classe = options.get('class')?.value as any;
    const mode = options.get('mode')?.value as any;

    const data = await ctx.client.api.getLeaderboard(classe, mode);

    const embed = new leaderboardEmbed(data);

    await interaction.reply({ embeds: [embed] });
  }

  static async autocomplete(
    interaction: AutocompleteInteraction,
    ctx: any,
  ): Promise<void> {
    console.log(interaction.options);

    const focused = interaction.options.data.find((option) => option.focused);

    if (!focused) return await interaction.respond([]);

    ctx.logger.info(interaction.options.getFocused());

    const value = interaction.options.getFocused();

    let data = [
      {
        name: 'Test',
        value: 'test',
      },
      {
        name: 'Test2',
        value: 'test2',
      },
    ];

    if (!value) return await interaction.respond(data.slice(0, 25));

    data = data.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase()),
    );

    return await interaction.respond(data);
  }
}
