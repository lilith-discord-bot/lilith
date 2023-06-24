import { Events } from "discord.js";

import { Event } from "../core/Event";
import { Worker } from "../lib/Worker";
import { EventNotifier } from "../lib/notifications/EventNotifier";

export default class Ready extends Event {
  constructor() {
    super("onReady", Events.ClientReady);
  }

  async run(): Promise<void> {
    if (this.client.cluster.id === 0) {
      new EventNotifier();
      new Worker();
    }

    const shards =
      [...this.client.cluster.ids.keys()].length > 1
        ? [...this.client.cluster.ids.keys()].join(", ")
        : [...this.client.cluster.ids.keys()];

    this.client.logger.info(
      `${this.client.user?.tag}, ready to serve ${this.client.guilds.cache.size} servers on cluster #${this.client.cluster.id} (Shards: ${shards})`
    );
  }
}
