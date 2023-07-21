import * as querystring from "querystring";

import { Classes, Modes, Leaderboard, Character, Account, RawEvents, Stats, Status } from "../types";

import { request } from "../utils/Commons";
import { ARMORY_API_URL, ARMORY_URL } from "../utils/Constants";

/**
 * Gets the events.
 *
 * @returns {Promise<Events | null>} The events.
 */
export async function getEvents(): Promise<RawEvents | null> {
  const res = await request(`${ARMORY_API_URL}/events/recent`, true);
  return res;
}

/**
 * Gets the stats.
 *
 * @returns {Promise<Stats | null>} The stats.
 */
export async function getStats(): Promise<Stats | null> {
  const res = await request(`${ARMORY_API_URL}/stats`, true);
  return res;
}

/**
 * Gets the leaderboard.
 *
 * @param classe - The class.
 * @param mode - The mode.
 *
 * @returns {Promise<Leaderboard[] | null>} The leaderboard.
 */
export async function getLeaderboard(
  classe: Classes = "allclasses",
  mode: Modes = "allmodes"
): Promise<Leaderboard[] | null> {
  const query = querystring.stringify({ classe, mode });
  const res = await request(`${ARMORY_API_URL}/leaderboard?${query}`, true);
  return res;
}

/**
 *  Gets the player using the Battle Tag.
 *
 * @param battleTag - The battle tag of the player.
 *
 * @returns {Promise<Account | null>} The player.
 */
export async function getPlayer(battleTag: string): Promise<Account | null> {
  const res = await request(`${ARMORY_API_URL}/armory/${battleTag}`, true);
  return res;
}

/**
 * Gets the player details.
 *
 * @param battleTag - The battle tag.
 * @param heroId  - The hero id.
 * @returns {Character | null} The player.
 */
export async function getPlayerArmory(battleTag: string, heroId: string): Promise<Character | null> {
  const res = await request(`${ARMORY_API_URL}/armory/${battleTag}/${heroId}`, true);
  return res;
}

/**
 * Gets the status.
 *
 * @returns {Promise<Status | null>} The status.
 */
export async function getStatus(): Promise<Status | null> {
  const res = await request(`${ARMORY_URL}/status`, true);
  return res;
}
