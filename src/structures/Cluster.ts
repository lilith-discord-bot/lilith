import { ClusterClient } from "discord-hybrid-sharding";

import { Client } from "./Client";

import { createLogger } from "../lib/Logger";

export class Cluster extends ClusterClient<Client> {
  public logger = createLogger(`Cluster #${this.id}`);
  constructor(options: Client) {
    super(options);
  }
}
