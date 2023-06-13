import {
  ApplicationCommandData,
  ApplicationCommandType,
  CommandInteraction,
} from 'discord.js';

import { Context, Interaction } from '../../core/Interaction';

export default class Armory extends Interaction {

  static enabled = true;

  static command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: 'glyph',
    description: 'Displays the glyph chart.',
  };

  static async run(
    interaction: CommandInteraction,
    ctx: Context,
  ): Promise<any> {
    await interaction.reply('https://i.imgur.com/NkqsHef.png');
  }
}
