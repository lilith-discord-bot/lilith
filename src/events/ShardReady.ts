import { Events } from 'discord.js';
import { Client } from '../core/Client';
import { Event } from '../core/Event';

export default class ShardReady extends Event {
  constructor(client: Client) {
    super(client, 'onShardReady', Events.ShardReady);
  }

  async run(...[id]: any[]): Promise<void> {

    this.client.logger.info(`Running event ${this.id} for ${this.event}`);
    
    this.client.logger.info(`Shard #${id} ready on cluster #${this.client.cluster.id}`);
  }
}
