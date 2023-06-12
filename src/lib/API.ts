import {
  Classes,
  Events,
  Modes,
  Player,
  PlayerArmory,
  PlayerResearch,
  Stats,
  Status,
} from '../types';

import { request } from '../utils/Commons';

export class API {
  /**
   * Gets the events.
   *
   * @returns {Promise<Events | null>} The events.
   */
  async getEvents(): Promise<Events | null> {
    const res = await request(`${process.env.ARMORY_API_URL}/events/recent`, true);
    return res;
  }

  /**
   * Gets the stats.
   *
   * @returns {Promise<Stats | null>} The stats.
   */
  async getStats(): Promise<Stats | null> {
    const res = await request(`${process.env.ARMORY_API_URL}/stats`, true);
    return res;
  }

  /**
   * Gets the leaderboard.
   *
   * @param classe - The class.
   * @param mode - The mode.
   *
   * @returns {Promise<Player[] | null>} The leaderboard.
   */
  async getLeaderboard(
    classe: Classes = 'allclasses',
    mode: Modes = 'allmodes',
  ): Promise<Player[] | null> {
    const res = await request(
      `${process.env.ARMORY_API_URL}/leaderboard/${classe}/${mode}`,
      true,
    );
    return res;
  }

  /**
   *  Gets the player using the Battle Tag.
   *
   * @param battleTag - The battle tag of the player.
   *
   * @returns {Promise<PlayerResearch | null>} The player.
   */
  async getPlayer(battleTag: string): Promise<PlayerResearch | null> {
    const res = await request(
      `${process.env.ARMORY_API_URL}/${battleTag}`,
      true,
    );
    return res;
  }

  /**
   * Gets the player details.
   *
   * @param battleTag - The battle tag.
   * @param heroId  - The hero id.
   * @returns {PlayerArmory | null} The player.
   */
  async getPlayerArmory(
    battleTag: string,
    heroId: string,
  ): Promise<PlayerArmory | null> {
    const res = await request(
      `${process.env.ARMORY_API_URL}/${battleTag}/${heroId}`,
      true,
    );
    return res;
  }

  /**
   * Gets the status.
   *
   * @returns {Promise<Status | null>} The status.
   */
  async getStatus(): Promise<Status | null> {
    const res = await request(`${process.env.ARMORY_URL}/status`, true);
    return res;
  }
}
