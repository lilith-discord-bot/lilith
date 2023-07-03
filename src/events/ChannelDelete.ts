import { Channel, ChannelType, DMChannel, Events, Guild, GuildChannel } from "discord.js";

import { Event } from "../structures/Event";

export default class ChannelDelete extends Event {
  constructor() {
    super("onChannelDelete", Events.ChannelDelete);
  }

  async run(channel: GuildChannel | DMChannel): Promise<void> {
    if (!this.client.isReady) return;

    if (channel.isDMBased() || [ChannelType.GuildVoice].includes(channel.type)) return;

    await this.client.repository.guild.deleteChannel(channel.guildId, channel.id);

    this.client.logger.info(`Channel ${channel.id} deleted in guild ${channel.guildId}.`);
  }
}
