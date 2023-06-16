import {
  ActionRowBuilder,
  ApplicationCommandData,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
} from "discord.js";

import { Context, Interaction } from "../../core/Interaction";
import { InfoEmbed } from "../../utils/embeds/InfoEmbed";
import { BOT_INVITE, SUPPORT_SERVER } from "../../utils/Constants";

export default class Info extends Interaction {
  static enabled = true;

  static command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "info",
    description: "Displays Lilith's info.",
  };

  static async run(interaction: CommandInteraction, ctx: Context): Promise<any> {
    const guilds = await ctx.client.cluster.broadcastEval((client) => client.guilds.cache.size);
    const users = await ctx.client.cluster.broadcastEval((client) =>
      client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
    );

    const data = {
      guilds: guilds.reduce((acc, guildCount) => acc + guildCount, 0),
      users: users.reduce((acc, memberCount) => acc + memberCount, 0),
      shardId: interaction.guild?.shardId || 0,
    };

    const buttons = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder({
          label: "Invite me",
          style: ButtonStyle.Link,
          url: BOT_INVITE.replace("{{id}}", ctx.client.user!.id),
        }),
        new ButtonBuilder({
          label: "Support",
          style: ButtonStyle.Link,
          url: SUPPORT_SERVER,
        }),
        new ButtonBuilder({
          label: "GitHub",
          style: ButtonStyle.Link,
          url: "https://github.com/glazk0/lilith",
        }),
      ],
    });

    const embed = new InfoEmbed(data, ctx);

    await interaction.reply({
      embeds: [embed],
      components: [buttons],
    });
  }
}
