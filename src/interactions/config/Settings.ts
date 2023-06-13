import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Channel,
  ChannelType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildChannel,
  NewsChannel,
  PermissionFlagsBits,
  TextChannel,
} from 'discord.js';

import { Context, Interaction } from '../../core/Interaction';
import { eventsChoices } from '../../utils/Constants';

export default class Settings extends Interaction {
  static enabled = true;

  static command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: 'settings',
    description: 'Manage your actual guild settings.',
    defaultMemberPermissions: [PermissionFlagsBits.ManageGuild],
    options: [
      {
        type: ApplicationCommandOptionType.SubcommandGroup,
        name: 'notifications',
        description: 'Manage your notifications settings.',
        options: [
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'enable',
            description: 'Enable notifications for a given event.',
            options: [
              {
                type: ApplicationCommandOptionType.String,
                name: 'event',
                description: 'The event to enable notifications for.',
                choices: eventsChoices,
                required: true,
              },
              {
                type: ApplicationCommandOptionType.Channel,
                name: 'channel',
                description: 'The channel to send notifications to.',
                channelTypes: [ChannelType.GuildAnnouncement, ChannelType.GuildText],
                required: true,
              },
              {
                type: ApplicationCommandOptionType.Role,
                name: 'role',
                description: 'The role to mention in the notification.',
              },
              // {
              //   type: ApplicationCommandOptionType.Boolean,
              //   name: 'schedule',
              //   description: 'Do you want to create a Discord scheduled event?',
              // },
            ],
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'disable',
            description: 'Disable notifications for a given event.',
            options: [
              {
                type: ApplicationCommandOptionType.String,
                name: 'event',
                description: 'The event to disable notifications for.',
                choices: eventsChoices,
                required: true,
              },
            ],
          },
        ],
      },
    ],
  };
  guild: any;

  static async run(
    interaction: CommandInteraction,
    ctx: Context,
  ): Promise<any> {

    const options = interaction.options as CommandInteractionOptionResolver;

    const group = options.getSubcommandGroup();
    const subcommand = options.getSubcommand();

    let event = options.getString('event');
    let channel = options.getChannel('channel') as GuildChannel;
    let role = options.getRole('role');
    let schedule = options.getBoolean('schedule');

    switch (group) {
      case 'notifications':
        switch (subcommand) {
          case 'enable':

            if (!channel.permissionsFor(interaction.client.user)?.has(PermissionFlagsBits.SendMessages)) {
              return await interaction.reply({
                content: `I don't have permissions to send messages in ${channel}.`,
                ephemeral: true,
              });
            }

            // @ts-ignore
            role = options.getRole('role') || ctx.guild?.settings?.events?.[event as string]?.role;
            // @ts-ignore
            schedule = options.getBoolean('schedule') || ctx.guild?.settings?.events?.[event as string]?.schedule;

            try {
              await ctx.client.repository.guild.updateEvent(interaction.guildId!, event as any, { enabled: true, channel: channel as any as string, role: role as any as string, schedule: schedule as any as boolean });
            } catch (error) {
              ctx.client.logger.error(error);
            }

            // @ts-ignore
            if (!ctx.guild?.settings?.events?.[event as string]?.enabled)
              await interaction.reply({
                content: `Notifications for **${event}** have been enabled.`,
                ephemeral: true,
              });
            else await interaction.reply({
              content: `Notifications for **${event}** have been updated.`,
              ephemeral: true,
            });

            break;
          case 'disable':

            // @ts-ignore
            if (!ctx.guild?.settings?.events?.[event as string]?.enabled) {
              return await interaction.reply({
                content: `Notifications for **${event}** are already disabled.`,
                ephemeral: true,
              });
            }

            try {
              await ctx.client.repository.guild.updateEvent(interaction.guildId!, event as any, { enabled: false, channel: null, role: null, schedule: false });
            } catch (error) {
              ctx.client.logger.error(error);
            }

            await interaction.reply({
              content: `Notifications for **${event}** have been disabled.`,
              ephemeral: true,
            });
            break;
        }
        break;
    }
  }
}
