import "reflect-metadata";

import { config } from "dotenv";

config();

import path from "node:path";
import { ClusterManager } from "discord-hybrid-sharding";

import { Logger } from "./lib/Logger";
import { registerClusterEvents } from "./lib/RegisterEvents";
import { database } from "./lib/db/postgresql/Database";
import { container } from "tsyringe";
import { Client } from "./core/Client";
import { clientSymbol } from "./utils/Constants";

// TODO : See docs for more information and maybe add plugins to handle reclustering

const manager = new ClusterManager(path.join(__dirname, "./core/Client.js"), {
  totalShards: "auto",
  totalClusters: "auto",
  mode: "process",
  shardsPerClusters: 2,
  token: process.env.TOKEN,
});

registerClusterEvents(manager, Logger);

database.$connect();
const client = container.resolve<Client>(clientSymbol);
client.registerClusterDatabase(database);

manager
  .spawn({
    timeout: -1,
  })
  .catch((reason: any) => Logger.error("Shard spawn has occured a error", reason));
