import { Cluster, ClusterManager } from "discord-hybrid-sharding";

import { logger } from "../lib/Logger";

export class Manager {
  private manager: ClusterManager;

  constructor(manager: ClusterManager) {
    this.manager = manager;
  }

  /**
   * Start the manager and spawn the clusters.
   *
   */
  public async start(): Promise<void> {
    this.registerEvents();
    await this.manager
      .spawn({
        timeout: -1,
      })
      .then(() => logger.info("Clusters has been spawned"))
      .catch((reason) => logger.error("Clusters failed to spawn", reason));
  }

  /**
   * Stop the manager and destroy the clusters.
   */
  public async stop(): Promise<void> {
    logger.info("Stopping clusters...");
    await this.manager.broadcastEval((c) => c.destroy());
  }

  private registerEvents(): void {
    this.manager.on("debug", (value: string) => logger.debug(value));
    this.manager.on("clusterCreate", (cluster: Cluster) => logger.info(`Launched cluster #${cluster.id}`));
    this.manager.on("clusterReady", (cluster: Cluster) => logger.info(`Cluster #${cluster.id} is ready`));
  }
}
