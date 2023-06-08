import { Events } from 'discord.js';
import { Client } from '../core/Client';
import { Event } from '../core/Event';

export default class Ready extends Event {
  constructor(client: Client) {
    super(client, 'onReady', Events.ClientReady);
  }

  async run(...args: any[]): Promise<void> {
    
    this.client.logger.info(`Running event ${this.id} for ${this.event}`);

    const shards =
      [...this.client.cluster.ids.keys()].length > 1
        ? [...this.client.cluster.ids.keys()].join(', ')
        : [...this.client.cluster.ids.keys()];

    this.client.logger.info(`${this.client.user?.tag}, ready to serve ${this.client.guilds.cache.size} servers on cluster #${this.client.cluster.id} (Shards: ${shards})`);
  }
}
