import {
  ApplicationCommandData,
  ApplicationCommandType,
  CommandInteraction
} from 'discord.js';

import { Context, Interaction } from '../../core/Interaction';

export default class Leaderboard extends Interaction {
  static enabled = true;

  static command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: 'xp',
    description: 'Displays the XP chart.',
  };

  static async run(
    interaction: CommandInteraction,
    ctx: Context,
  ): Promise<any> {
    await interaction.reply('https://i.imgur.com/K2r2cMF.jpg');
  }
}
