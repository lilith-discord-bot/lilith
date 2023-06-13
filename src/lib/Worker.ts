import { Client } from "../core/Client";
import { request } from "../utils/Commons";
import { MAP_API_URL } from "../utils/Constants";

export class Worker {

    /**
     * The client.
     * @type {Client}
     * @readonly
     */
    readonly client: Client;

    constructor(client: Client) {

        this.client = client;

        this.refreshPlayers();
        this.refreshMap();
    }

    /**
     * Refresh the player cache.
     */
    async refreshPlayers() {

        const data = await this.client.api.getLeaderboard();

        if (!data) return this.client.logger.error('Failed to fetch leaderboard data.');

        for (const player of data) {

            const isCached = await this.client.cache.exists(`players:${player.battleTag}`);

            if (isCached)
                continue;

            const user = await this.client.api.getPlayer(player.battleTag);

            this.client.logger.info(`Adding ${player.battleTag} to cache with ${user?.characters.length} characters.`);

            const playerObj = {
                battleTag: player.battleTag,
                name: user && user.characters.sort((a, b) => b.level - a.level)[0].name || player.name,
                characters: user?.characters.map((character) => character.name),
            };

            await this.client.cache.set(`players:${player.battleTag}`, JSON.stringify(playerObj));
        }
    }

    /**
     * Refresh the map cache.
     */
    async refreshMap() {

        const data = await request(MAP_API_URL, true) as {
            alchemists: any[],
            altars: any[],
            cellars: any[],
            dungeons: any[],
            healers: any[],
            helltideChests: any[],
            jewelers: any[],
            occultists: any[],
            stableMasters: any[],
            waypoints: any[],
        };

        if (!data) return this.client.logger.error('Failed to fetch map data.');

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key as keyof typeof data];
                await this.client.cache.set(`map:${key}`, JSON.stringify(value));
            }
        }
    }
}