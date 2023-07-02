import "reflect-metadata";

import { ClusterManager } from "discord-hybrid-sharding";
import { config } from "dotenv";
import { join, resolve } from "node:path";

config();

import { Logger } from "./lib/Logger";
import { registerClusterEvents } from "./lib/RegisterEvents";
import { database } from "./lib/db/postgresql/Database";

database.$connect();

const manager = new ClusterManager(join(resolve("structures", "Client.js")), {
  totalShards: "auto",
  totalClusters: "auto",
  mode: "process",
  shardsPerClusters: 3,
  token: process.env.TOKEN,
});

registerClusterEvents(manager, Logger);

manager
  .spawn({
    timeout: -1,
  })
  .catch((reason: any) => Logger.error("Shard spawn has occured a error", reason));
