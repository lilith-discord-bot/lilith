import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CacheType,
  ChannelType,
  ChatInputCommandInteraction,
  GuildChannel,
  InteractionResponse,
  Message,
  NewsChannel,
  PermissionFlagsBits,
  Role,
  TextChannel,
  ThreadChannel,
} from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../core/Client";
import { Context, Interaction } from "../../core/Interaction";

import { SettingsEmbed } from "../../embeds/SettingsEmbed";

import L from "../../i18n/i18n-node";
import { Locales } from "../../i18n/i18n-types";
import { locales } from "../../i18n/i18n-util";

import { Event as D4Event, EventsList } from "../../types";
import { clientSymbol, eventsChoices, localesMap } from "../../utils/Constants";
import { EventEmbed } from "../../embeds/EventEmbed";
import { Event } from "@prisma/client";
import { getTitle } from "../../lib/notifications/NotifierUtils";

@injectable()
export default class Settings extends Interaction {
  public readonly enabled = true;

  public readonly category = "Configuration";

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "settings",
    description: "Manage your guild settings.",
    defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
    dmPermission: false,
    options: [
      {
        type: ApplicationCommandOptionType.Subcommand,
        name: "locale",
        description: "Change the locale of the bot for your guild.",
        options: [
          {
            type: ApplicationCommandOptionType.String,
            name: "value",
            description: "What locale do you want to set?",
            required: true,
            choices: locales.map((locale) => ({
              name: localesMap[locale],
              value: locale,
            })),
          },
        ],
      },
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
                channelTypes: [ChannelType.GuildAnnouncement, ChannelType.GuildText, ChannelType.PublicThread],
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
                channelTypes: [ChannelType.GuildAnnouncement, ChannelType.GuildText, ChannelType.PublicThread],
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
                channelTypes: [ChannelType.GuildAnnouncement, ChannelType.GuildText, ChannelType.PublicThread],
                required: true,
              },
            ],
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "list",
            description: "List all notifications enabled.",
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "refresh",
            description: "Refresh notifications for a given event.",
            options: [
              {
                type: ApplicationCommandOptionType.String,
                name: "event",
                description: "The event to refresh notifications for.",
                choices: eventsChoices,
                required: true,
              },
            ],
          },
        ],
      },
    ],
  };

  constructor(@inject(clientSymbol) private client: Client) {
    super();
  }

  public async run(
    interaction: ChatInputCommandInteraction<CacheType>,
    { guild, i18n }: Context
  ): Promise<InteractionResponse<boolean>> {
    const options = interaction.options;

    const group = options.getSubcommandGroup();
    const subcommand = options.getSubcommand();

    let locale = options.getString("value") as Locales;
    let event = options.getString("event") as EventsList;
    let channel = options.getChannel("channel") as GuildChannel;
    let role = options.getRole("role");
    let schedule = options.getBoolean("schedule");

    switch (subcommand) {
      case "locale":
        try {
          await this.client.repository.guild.updateLocale(interaction.guild.id, locale as Locales);
        } catch (error) {
          this.client.logger.error(error);
        }

        await interaction.reply({
          content: L[locale].settings.locale.SUCCESS({ locale: localesMap[locale as Locales] }),
          ephemeral: true,
        });
        break;
    }

    let currentEvent: Event | undefined;

    if (channel) currentEvent = guild?.events.find((item) => item.type === event && channel.id === item.channelId);

    switch (group) {
      case "notifications":
        switch (subcommand) {
          case "enable":
            if (!this.checkPermission(interaction, channel))
              return await interaction.reply({
                content: i18n.settings.notifications.NO_PERMISSIONS({ channel: channel.toString() }),
                ephemeral: true,
              });

            if (currentEvent)
              return await interaction.reply({
                content: i18n.settings.notifications.ALREADY_ENABLED({ event }),
                ephemeral: true,
              });

            const roleElement = role?.id;

            try {
              await this.client.repository.guild.createEvent(interaction.guild.id, event, {
                channel: channel.id,
                role: roleElement || null,
                schedule: false,
              });
            } catch (error) {
              this.client.logger.error(error);
            }

            await interaction.reply({
              content: i18n.settings.notifications.ENABLED({ event, channel: channel.toString() }),
              ephemeral: true,
            });
            break;
          case "update":
            if (!this.checkPermission(interaction, channel))
              return await interaction.reply({
                content: i18n.settings.notifications.NO_PERMISSIONS({ channel: channel.toString() }),
                ephemeral: true,
              });

            if (!currentEvent)
              return await interaction.reply({
                content: i18n.settings.notifications.NOT_ENABLED({ event }),
                ephemeral: true,
              });

            const roleElementUpdate = role?.id;

            try {
              await this.client.repository.guild.updateEvent(interaction.guild.id, event, {
                channel: channel.id,
                role: roleElementUpdate || currentEvent.roleId,
                schedule: currentEvent.schedule,
              });
            } catch (error) {
              this.client.logger.error(error);
            }

            await interaction.reply({
              content: i18n.settings.notifications.UPDATED({ event, channel: channel.toString() }),
              ephemeral: true,
            });
            break;
          case "disable":
            if (!currentEvent)
              return await interaction.reply({
                content: i18n.settings.notifications.NOT_ENABLED({ event }),
                ephemeral: true,
              });

            try {
              await this.client.repository.guild.removeEvent(interaction.guild.id, event as EventsList, channel.id);
            } catch (error) {
              this.client.logger.error(error);
            }

            await interaction.reply({
              content: i18n.settings.notifications.DISABLED({ event }),
              ephemeral: true,
            });
            break;
          case "list":
            const events = guild?.events;

            if (!events?.length)
              return await interaction.reply({
                content: i18n.settings.notifications.NO_EVENTS(),
                ephemeral: true,
              });

            const embed = new SettingsEmbed(events, {
              i18n,
              guild,
            });

            await interaction.reply({ embeds: [embed], ephemeral: true });
            break;
          case "refresh":
            const currentEvents = guild?.events.filter((item) => item.type === event);

            if (!currentEvents?.length)
              return await interaction.reply({
                content: i18n.settings.notifications.NOT_ENABLED({ event }),
                ephemeral: true,
              });

            const cache = await this.client.cache.get(`events:${this.client.user.id}:${event}`);

            if (!cache)
              return await interaction.reply({
                content: i18n.settings.notifications.NO_EVENTS(),
                ephemeral: true,
              });

            const value = JSON.parse(cache) as any as D4Event;

            for (const event of currentEvents) {
              const embed = new EventEmbed(event.type, value);

              const channel = interaction.guild.channels.cache.get(event.channelId) as TextChannel | NewsChannel;

              if (!channel) continue;

              let content = getTitle(event.type, value, guild.locale as Locales);

              if (event.roleId) {
                content += ` - <@&${event.roleId}>`;
              }

              const oldMessage = event.messageId
                ? ((await channel.messages.fetch(event.messageId).catch((e) => {
                    console.error(`Unable to send fetch message ${event.messageId}:`, e.message);
                    return null;
                  })) as Message<true>)
                : null;

              if (oldMessage)
                await oldMessage
                  .delete()
                  .catch((e) => console.error(`Unable to remove message with id: ${event.messageId}`, e));

              const message = await channel.send({
                content,
                embeds: [embed],
              });

              try {
                await this.client.repository.guild.updateEventMessageId(
                  interaction.guild.id,
                  event.type as EventsList,
                  channel.id,
                  message.id
                );
              } catch (error) {
                this.client.logger.error(`Unable to update event ${event.type} in guild ${interaction.guild.id}`);
              }
            }

            await interaction.reply({
              content: i18n.settings.notifications.REFRESHED({
                event,
                channels: currentEvents.map((item) => `<#${item.channelId}>`).join(", "),
              }),
              ephemeral: true,
            });
            break;
        }
        break;
    }
  }

  private checkPermission(
    interaction: ChatInputCommandInteraction<CacheType>,
    channel: GuildChannel | TextChannel | NewsChannel | ThreadChannel
  ) {
    return (
      channel
        .permissionsFor(interaction.client.user)
        ?.has([PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]) ?? false
    );
  }
}
