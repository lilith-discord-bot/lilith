import { Events, Guild } from "discord.js";

import { Client } from "../structures/Client";
import { Event } from "../structures/Event";

export default class GuildCreate extends Event {
  constructor() {
    super("onGuildCreate", Events.GuildCreate);
  }

  async run(guild: Guild): Promise<void> {
    if (!this.client.isReady) return;

    await this.client.repository.guild.findOrCreate(guild.id);

    this.client.logger.info(`Joined ${guild.name} (${guild.id})`);
  }
}
