import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Channel,
  ChannelType,
  CommandInteraction,
  CommandInteractionOptionResolver,
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
            name: 'setup',
            description: 'Setup the channel where notifications will be sent.',
            options: [
              {
                type: ApplicationCommandOptionType.Channel,
                name: 'channel',
                description: 'The channel to send notifications to.',
                channelTypes: [ChannelType.GuildAnnouncement, ChannelType.GuildText],
                required: true,
              }
            ]
          },
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
              // {
              //   type: ApplicationCommandOptionType.Role,
              //   name: 'role',
              //   description: 'The role to mention in the notification.',
              // },
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

    const event = options.getString('event');
    const channel = options.getChannel('channel');
    const role = options.getRole('role');
    const schedule = options.getBoolean('schedule');

    switch (group) {
      case 'notifications':
        switch (subcommand) {
          case 'setup':

            if (ctx.guild?.settings.events.channel) {

              const oldChannel = ctx.guild?.settings.events.channel as any as Channel;

              if (channel?.id === oldChannel.id) return await interaction.reply({content: `Notifications channel is already set to ${channel}.`, ephemeral: true });

              let channelToDeleteMessage = ctx.client.channels.cache.get(oldChannel.id) as TextChannel | NewsChannel;

              const messageId = await ctx.client.cache.get(`events:message:${ctx.guild.id}`);

              (await channelToDeleteMessage.messages.fetch()).filter((m: any) => m.id === messageId).first()?.delete();

              await ctx.client.cache.del(`events:message:${ctx.guild.id}`);
            }

            try {
              await ctx.client.repository.guild.updateChannel(interaction.guildId!, channel as Channel);
            } catch (error) {
              ctx.client.logger.error(error);
            }

            await interaction.reply({
              content: `Notifications channel has been set to ${channel}, the embed will soon be send.`,
              ephemeral: true,
            });
            break;

          case 'enable':

            try {
              await ctx.client.repository.guild.updateEvent(interaction.guildId!, event as any, { enabled: true, role: role as any as string, schedule: schedule ? true : false });
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
              await ctx.client.repository.guild.updateEvent(interaction.guildId!, event as any, { enabled: false, role: '', schedule: false });
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
