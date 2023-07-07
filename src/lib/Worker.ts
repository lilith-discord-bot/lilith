import { container } from "tsyringe";

import { Client } from "../structures/Client";
import { request, wait } from "../utils/Commons";
import { DATABASE_URL, MAP_API_URL, clientSymbol, languages } from "../utils/Constants";
import { getLeaderboard, getPlayer } from "./API";
import { Map } from "../types";

export class Worker {
  /**
   * The client.
   * @type {Client}
   * @readonly
   */
  readonly client: Client;

  constructor() {
    this.client = container.resolve<Client>(clientSymbol);

    this.refreshDatabase();
    this.refreshPlayers();
    this.refreshMap();
  }

  /**
   * Refresh the map cache.
   */
  async refreshDatabase() {
    this.client.logger.info(`Refreshing the database cache for ${languages.length} languages.`);

    for (const language of languages) {
      let data = await request(`${DATABASE_URL}/i18n/autocomplete_${language}.json`, true);

      if (!data) continue;

      let cache = await this.client.cache.get(`database:${language}`);

      if (cache) {
        cache = JSON.parse(cache);
        if (cache?.length === data.length) continue;
      }

      await this.client.cache.set(`database:${language}`, JSON.stringify(data));

      this.client.logger.info(`Added ${data.length} entries to the database cache for ${language}.`);

      await wait(1000);
    }
  }

  /**
   * Refresh the player cache.
   */
  async refreshPlayers() {
    const data = await getLeaderboard();

    if (!data) return this.client.logger.error("Failed to fetch leaderboard data.");

    for (const player of data) {
      const isCached = await this.client.cache.exists(`players:${player.battleTag}`);

      if (isCached) continue;

      const user = await getPlayer(player.battleTag);

      if (!user || !user?.characters || !user?.characters.length) continue;

      this.client.logger.info(`Adding ${player.battleTag} to cache with ${user?.characters.length} characters.`);

      const playerObj = {
        battleTag: player.battleTag,
        character: user?.characters.reduce((prev, current) => (prev.level > current.level ? prev : current)).name,
        characters: user?.characters.map((character) => character.name),
      };

      await this.client.cache.set(`players:${player.battleTag}`, JSON.stringify(playerObj));

      await wait(1000);
    }
  }

  /**
   * Refresh the map cache.
   */
  async refreshMap() {
    const data = (await request(MAP_API_URL, true)) as Map;

    if (!data) return this.client.logger.error("Failed to fetch map data.");

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key as keyof typeof data];
        await this.client.cache.set(`map:${key}`, JSON.stringify(value));
      }
    }
  }
}
