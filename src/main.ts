require('dotenv').config();

import path from 'node:path';

import { ClusterManager } from 'discord-hybrid-sharding';

import { Logger } from './lib/Logger';
import { registerClusterEvents } from './lib/RegisterEvents';

// TODO : See docs for more information and maybe add plugins to handle reclustering

const manager = new ClusterManager(path.join(__dirname, './core/Client.js'), {
  totalShards: 'auto',
  totalClusters: 'auto',
  mode: 'process',
  shardsPerClusters: 2,
  token: process.env.TOKEN,
});

registerClusterEvents(manager, Logger);

manager
  .spawn({
    timeout: -1,
  })
  .catch((...args: any[]) =>
    console.error('Shard spawn has occured a error', ...args),
  );
