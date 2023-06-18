import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CacheType,
  ChannelType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildChannel,
  PermissionFlagsBits,
} from "discord.js";

import { Context, Interaction } from "../../core/Interaction";
import { EventsList } from "../../types";
import { eventsChoices } from "../../utils/Constants";
import { SettingsEmbed } from "../../utils/embeds/SettingsEmbed";

export default class Settings extends Interaction {
  static enabled = true;

  static command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "settings",
    description: "Manage your actual guild settings.",
    defaultMemberPermissions: [PermissionFlagsBits.ManageGuild],
    options: [
      {
        type: ApplicationCommandOptionType.SubcommandGroup,
        name: "notifications",
        description: "Manage your notifications settings.",
        options: [
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "enable",
            description: "Enable notifications for a given event.",
            options: [
              {
                type: ApplicationCommandOptionType.String,
                name: "event",
                description: "The event to enable notifications for.",
                choices: eventsChoices,
                required: true,
              },
              {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "The channel to send notifications to.",
                channelTypes: [
                  ChannelType.GuildAnnouncement,
                  ChannelType.GuildText,
                  ChannelType.PublicThread,
                  ChannelType.PrivateThread,
                ],
                required: true,
              },
              {
                type: ApplicationCommandOptionType.Role,
                name: "role",
                description: "The role to mention in the notification.",
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
            name: "update",
            description: "Update notifications for a given event.",
            options: [
              {
                type: ApplicationCommandOptionType.String,
                name: "event",
                description: "The event to update notifications for.",
                choices: eventsChoices,
                required: true,
              },
              {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "The channel to send notifications to.",
                channelTypes: [
                  ChannelType.GuildAnnouncement,
                  ChannelType.GuildText,
                  ChannelType.PublicThread,
                  ChannelType.PrivateThread,
                ],
                required: true,
              },
              {
                type: ApplicationCommandOptionType.Role,
                name: "role",
                description: "The role to mention in the notification.",
              },
            ],
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "disable",
            description: "Disable notifications for a given event.",
            options: [
              {
                type: ApplicationCommandOptionType.String,
                name: "event",
                description: "The event to disable notifications for.",
                choices: eventsChoices,
                required: true,
              },
              {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "The channel to disable notifications to.",
                channelTypes: [ChannelType.GuildAnnouncement, ChannelType.GuildText],
                required: true,
              },
            ],
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "list",
            description: "List all notifications enabled.",
          },
        ],
      },
    ],
  };

  static async run(interaction: CommandInteraction<CacheType>, ctx: Context): Promise<any> {
    if (!interaction.isChatInputCommand() || !interaction.guild) return;

    const options = interaction.options as CommandInteractionOptionResolver;

    const group = options.getSubcommandGroup();
    const subcommand = options.getSubcommand();

    let event = options.getString("event") as EventsList;
    let channel = options.getChannel("channel") as GuildChannel;
    let role = options.getRole("role");
    let schedule = options.getBoolean("schedule");

    const currentEvent = ctx.guild?.events.find((item) => item.type === event && channel.id === item.channelId);

    switch (group) {
      case "notifications":
        switch (subcommand) {
          case "enable":
            if (
              !channel
                .permissionsFor(interaction.client.user)
                ?.has([PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel])
            ) {
              return await interaction.reply({
                content: `I don't have permissions to send messages in ${channel}.`,
                ephemeral: true,
              });
            }

            if (currentEvent)
              return await interaction.reply({
                content: `Notifications for **${event}** are already enabled.`,
                ephemeral: true,
              });

            const roleElement = role?.id;

            try {
              await ctx.client.repository.guild.createEvent(interaction.guild.id, event, {
                channel: channel.id,
                role: roleElement || null,
                schedule: false,
              });
            } catch (error) {
              ctx.client.logger.error(error);
            }

            await interaction.reply({
              content: `Notifications for **${event}** have been updated.`,
              ephemeral: true,
            });
            break;
          case "update":
            if (
              !channel
                .permissionsFor(interaction.client.user)
                ?.has([PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel])
            ) {
              return await interaction.reply({
                content: `I don't have permissions to send messages in ${channel}.`,
                ephemeral: true,
              });
            }

            if (!currentEvent) {
              return await interaction.reply({
                content: `Notifications for **${event}** are not enabled.`,
                ephemeral: true,
              });
            }

            const roleElementUpdate = role?.id;

            try {
              await ctx.client.repository.guild.updateEvent(interaction.guild.id, event, {
                channel: channel.id,
                role: roleElementUpdate || currentEvent.roleId,
                schedule: currentEvent.schedule,
              });
            } catch (error) {
              ctx.client.logger.error(error);
            }

            await interaction.reply({
              content: `Notifications for **${event}** have been updated.`,
              ephemeral: true,
            });
            break;
          case "disable":
            if (!currentEvent) {
              return await interaction.reply({
                content: `Notifications for **${event}** are already disabled.`,
                ephemeral: true,
              });
            }

            try {
              await ctx.client.repository.guild.removeEvent(interaction.guild.id, event as EventsList, channel.id);
            } catch (error) {
              ctx.client.logger.error(error);
            }

            await interaction.reply({
              content: `Notifications for **${event}** have been disabled.`,
              ephemeral: true,
            });
            break;
          case "list":
            const events = ctx.guild?.events;

            if (!events?.length) {
              return await interaction.reply({
                content: `No notifications enabled.`,
                ephemeral: true,
              });
            }

            const embed = new SettingsEmbed(events);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            break;
        }
        break;
    }
  }
}
