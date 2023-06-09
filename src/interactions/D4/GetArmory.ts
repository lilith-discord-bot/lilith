import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
  CommandInteraction,
} from 'discord.js';

import { Interaction } from '../../core/Interaction';

export default class GetArmory extends Interaction {
  static enabled = true;

  static command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: 'getarmory',
    description: 'Test command for the armory.',
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: 'player',
        description: 'The player to get the armory of.',
        required: true,
        autocomplete: true,
      },
    ],
  };

  static async run(interaction: CommandInteraction, ctx: any): Promise<any> {
    // if (interaction.targetId !== '112754571')
    //   return interaction.reply({
    //     content: 'This user is not in the armory.',
    //     ephemeral: true,
    //   });

    const { options } = interaction;

    let { value } = options.get('player') as any;

    console.log(value);

    if (!value) return await interaction.reply('No player provided.');

    const data = await fetch(`https://d4armory.io/api/112754571/${value}`).then(
      (res) => res.json(),
    );

    await interaction.reply(JSON.stringify(data).slice(0, 2000));
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
