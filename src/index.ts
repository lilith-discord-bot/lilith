import "reflect-metadata";
import "dotenv/config";

import { ClusterManager } from "discord-hybrid-sharding";

import { database } from "./lib/db/postgresql/Database";
import { Manager } from "./structures/Manager";

database.$connect();

const clusterManager = new ClusterManager(`${__dirname}/Bot.js`, {
  totalShards: "auto",
  totalClusters: "auto",
  mode: "process",
  shardsPerClusters: 6,
  token: process.env.TOKEN,
});

const manager = new Manager(clusterManager);

manager.start();

process.on("SIGINT", async () => {
  await manager.stop();
  process.exit(0);
});
