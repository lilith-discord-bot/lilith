import { Event } from "@prisma/client";
import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
  BaseGuildTextChannel,
  CacheType,
  ChannelType,
  ChatInputCommandInteraction,
  GuildChannel,
  InteractionResponse,
  Message,
  NewsChannel,
  PermissionFlagsBits,
  TextChannel,
  ThreadChannel,
} from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client";
import { Context, Interaction } from "../../structures/Interaction";

import { SettingsEmbed } from "../../embeds/SettingsEmbed";

import L from "../../i18n/i18n-node";
import { Locales } from "../../i18n/i18n-types";
import { locales } from "../../i18n/i18n-util";

import { EventEmbed } from "../../embeds/EventEmbed";
import { getTitle } from "../../lib/notifications/NotifierUtils";
import { Event as D4Event, EventsList } from "../../types";
import { clientSymbol, eventsChoices, localesMap } from "../../utils/Constants";

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
        description: `Change the locale of Lilith for your guild.`,
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
                channelTypes: [ChannelType.GuildAnnouncement, ChannelType.GuildText],
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
                channelTypes: [ChannelType.GuildAnnouncement, ChannelType.GuildText],
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
              {
                type: ApplicationCommandOptionType.String,
                name: "data",
                description: "The data to refresh notifications for. We're showing the last 2 events.",
                autocomplete: true,
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

    let data = options.getString("data");

    switch (subcommand) {
      case "locale":
        try {
          await this.client.repository.guild.updateLocale(interaction.guild.id, locale as Locales);
        } catch (error) {
          this.client.logger.error(`Error while updating locale for guild ${interaction.guild.id}`, error.message);
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
              this.client.logger.error(`Error while creating event for guild ${interaction.guild.id}`, error.message);
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
              this.client.logger.error(`Error while updating event for guild ${interaction.guild.id}`, error.message);
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

            const notification = await this.client.database.notification.findUnique({
              where: {
                id: data,
              },
            });

            if (!notification)
              return await interaction.reply({
                content: i18n.settings.notifications.NO_EVENTS(),
                ephemeral: true,
              });

            let channels: BaseGuildTextChannel[] = [];

            await interaction.deferReply({ ephemeral: true });

            for (const event of currentEvents) {
              const embed = new EventEmbed(event.type, notification.data as D4Event);

              const channel = interaction.guild.channels.cache.get(event.channelId) as TextChannel | NewsChannel;

              if (!channel) continue;

              if (!this.checkPermission(interaction, channel)) {
                await interaction.editReply({
                  content: i18n.settings.notifications.NO_PERMISSIONS({ channel: channel.toString() }),
                });
                continue;
              }

              let content = getTitle(event.type, notification.data as D4Event, guild.locale as Locales);

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

              channels.push(channel);
            }

            await interaction.editReply({
              content: i18n.settings.notifications.REFRESHED({
                event,
                channels:
                  channels.length > 1 ? channels.map((channel) => channel.toString()).join(", ") : channels[0].toString(),
              }),
            });
            break;
        }
        break;
    }
  }

  public async autocomplete(interaction: AutocompleteInteraction<CacheType>, context: Context): Promise<any> {
    const event = interaction.options.getString("event", true);

    let notifications = await this.client.database.notification.findMany({
      where: {
        type: event,
      },
    });

    if (!notifications.length) return await interaction.respond([]);

    notifications = notifications.sort((a, b) => b.timestamp - a.timestamp).splice(0, 2);

    await interaction.respond(
      notifications.map((notification) => ({
        name: new Date(notification.timestamp * 1000).toUTCString(),
        value: notification.id,
      }))
    );
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
