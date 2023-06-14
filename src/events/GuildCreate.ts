import { Events, Guild } from 'discord.js';

import { Client } from '../core/Client';
import { Event } from '../core/Event';

export default class Ready extends Event {
  constructor(client: Client) {
    super(client, 'onGuildCreate', Events.GuildCreate);
  }

  async run(guild: Guild): Promise<void> {
    
    if (!this.client.isReady) return;

    await this.client.repository.guild.findOrCreate(guild.id);

    this.client.logger.info(`Joined ${guild.name} (${guild.id})`);
  }
}
