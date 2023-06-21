import { Events, Guild } from "discord.js";

import { Client } from "../core/Client";
import { Event } from "../core/Event";

export default class GuildDelete extends Event {
  constructor() {
    super("onGuildDelete", Events.GuildDelete);
  }

  async run(guild: Guild): Promise<void> {
    if (!this.client.isReady) return;

    // await this.client.repository.guild.delete(guild.id);

    this.client.logger.info(`Leaved ${guild.name} (${guild.id})`);
  }
}
