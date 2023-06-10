import { Cluster, ClusterManager } from 'discord-hybrid-sharding';

import { Logger } from './Logger';
import { isDev } from '../utils/Commons';
import { Client } from '../core/Client';
import { Events } from 'discord.js';

/**
 * Registers the client events.
 *
 * @param client - The client.
 */
export function registerClientEvents(client: Client): void {
  
  client.once(Events.ClientReady, async () => {
    client.eventHandler.run(Events.ClientReady, []);
  });

  client.on(Events.ShardReady, async (id: number) => {
    client.logger.info(`Shard #${id} ready on cluster #${client.cluster.id}`);
  });

  client.on(Events.ShardReconnecting, async (id: number) => {
    client.logger.warn(`Shard #${id} reconnecting for cluster #${client.cluster.id}`);
  });

  client.on(Events.ShardDisconnect, async (event: any, id: number) => {
    client.logger.warn(
      `Shard #${id} disconnected with code ${event.code} for cluster #${client.cluster.id}`,
    );
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    client.eventHandler.run(Events.InteractionCreate, interaction);
  });

  client.on(Events.Error, (error: any) => {
    client.logger.error(error);
  });

  client.on(Events.Warn, (message: string) => {
    client.logger.warn(message);
  });

  client.on(Events.Debug, (message: string) => {
    if (isDev) client.logger.debug(message);
  });
}

/**
 * Registers the cluster events.
 *
 * @param manager - The cluster manager.
 * @param logger - The logger class.
 *
 * @returns {ClusterManager} The cluster manager.
 */
export function registerClusterEvents(
  manager: ClusterManager,
  logger: typeof Logger,
): ClusterManager {
  if (isDev) {
    manager.on('debug', (message: string) => {
      logger.debug(message);
    });
  }

  manager.on('clusterCreate', (cluster: Cluster) => {
    logger.info(`Launched cluster #${cluster.id}`);
  });

  manager.on('clusterReady', (cluster: Cluster) => {
    logger.info(`Cluster #${cluster.id} is ready`);
  });

  return manager;
}
