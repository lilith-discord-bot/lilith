import { container } from "tsyringe";

import { Client } from "../structures/Client";

import { request, wait } from "../utils/Commons";
import { DATABASE_URL, MAP_API_URL, clientSymbol, languages } from "../utils/Constants";

import { getLeaderboard, getPlayer } from "./API";
import { Map, Leaderboard, Account } from "../types";

export class Worker {
  /**
   * The client.
   * @type {Client}
   * @readonly
   */
  readonly client: Client;

  constructor() {
    this.client = container.resolve<Client>(clientSymbol);

    this.client.logger.info("Worker started.");

    this.refresh();
  }

  private async refresh() {
    await Promise.all([this.refreshDatabase(), this.refreshPlayers(), this.refreshMap()]);
  }

  /**
   * Refresh the map cache.
   */
  private async refreshDatabase() {
    this.client.logger.info(`Refreshing the database cache for ${languages.length} languages.`);

    for (const language of languages) {
      let data;

      try {
        data = await request(`${DATABASE_URL}/i18n/autocomplete_${language}.json`, true);
      } catch (error) {
        this.client.logger.error(`Failed to fetch database data for ${language}.`);
        continue;
      }

      let cache = await this.client.cache.get(`database:${language}`);

      if (cache) {
        cache = JSON.parse(cache);
        if (cache?.length === data.length) continue;
      }

      await this.client.cache.set(`database:${language}`, JSON.stringify(data));

      this.client.logger.info(`Added ${data.length} entries to the database cache for ${language}.`);

      await wait(250);
    }
  }

  /**
   * Refresh the player cache.
   */
  private async refreshPlayers() {
    this.client.logger.info("Refreshing the player cache.");

    let data: Leaderboard[];

    try {
      data = await getLeaderboard();
    } catch (error) {
      this.client.logger.error("Failed to fetch leaderboard data.");
      return;
    }

    for (const player of data) {
      const cache = await this.client.cache.exists(`players:${player.battleTag}`);

      if (cache) continue;

      let user: Account;

      try {
        user = await getPlayer(player.battleTag);
      } catch (error) {
        this.client.logger.error(`Failed to fetch player data for ${player.battleTag}.`);
        continue;
      }

      if (!user || "error" in user || !user?.characters || !user?.characters.length) continue;

      this.client.logger.info(`Adding ${player.battleTag} to cache with ${user?.characters.length} characters.`);

      const playerObj = {
        battleTag: player.battleTag,
        character: user?.characters.reduce((prev, current) => (prev.level > current.level ? prev : current)).name,
        characters: user?.characters.map((character) => character.name),
      };

      await this.client.cache.set(`players:${player.battleTag}`, JSON.stringify(playerObj));

      await wait(250);
    }
  }

  /**
   * Refresh the map cache.
   */
  private async refreshMap() {
  /**  this.client.logger.info("Refreshing the map cache.");

    let data: Map;

    try {
      data = await request(MAP_API_URL, true);
    } catch (error) {
      this.client.logger.error("Failed to fetch map data.");
      return;
    }

    for (const [key, value] of Object.entries(data)) {
      await this.client.cache.set(`map:${key}`, JSON.stringify(value));
    }
  } **/
}
