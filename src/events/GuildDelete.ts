import { Events, Guild } from 'discord.js';

import { Client } from '../core/Client';
import { Event } from '../core/Event';

export default class Ready extends Event {
  constructor(client: Client) {
    super(client, 'onGuildDelete', Events.GuildDelete);
  }

  async run(...[guild]: [guild: Guild]): Promise<void> {

    if (!this.client.isReady) return;

    await this.client.repository.guild.delete(guild.id);

    this.client.logger.info(`Leaved ${guild.name} (${guild.id})`);
  }
}
