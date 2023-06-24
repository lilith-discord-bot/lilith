import "reflect-metadata";

import { config } from "dotenv";
import path from "node:path";
import { ClusterManager } from "discord-hybrid-sharding";

config();

import { Logger } from "./lib/Logger";
import { registerClusterEvents } from "./lib/RegisterEvents";
import { database } from "./lib/db/postgresql/Database";

database.$connect();

const manager = new ClusterManager(path.join(__dirname, "./core/Client.js"), {
  totalShards: "auto",
  totalClusters: "auto",
  mode: "process",
  shardsPerClusters: 2,
  token: process.env.TOKEN,
});

registerClusterEvents(manager, Logger);

manager
  .spawn({
    timeout: -1,
  })
  .catch((reason: any) => Logger.error("Shard spawn has occured a error", reason));
