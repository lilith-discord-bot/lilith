import { request } from '../utils/Commons';
import { ClassesChoices, Player, Classes, PlayerDetails, ModesChoices, Modes, Events, Stats, Status } from '../types';

export const classesChoices: ClassesChoices[] = [
  {
    name: 'All classes',
    value: 'allclasses',
  },
  {
    name: 'Barbarian',
    value: 'Barbarian',
  },
  {
    name: 'Druid',
    value: 'Druid',
  },
  {
    name: 'Necromancer',
    value: 'Necromancer',
  },
  {
    name: 'Rogue',
    value: 'Rogue',
  },
  {
    name: 'Sorcerer',
    value: 'Sorcerer',
  },
];

export const modesChoices: ModesChoices[] = [
  {
    name: 'All modes',
    value: 'allmodes',
  },
  {
    name: 'Softcore',
    value: 'softcore',
  },
  {
    name: 'Hardcore',
    value: 'hardcore',
  },
  {
    name: 'Hall of Valor',
    value: 'dead',
  },
  {
    name: 'PvP',
    value: 'pvp',
  },
];

export default class API {
  /**
   * Gets the events.
   *
   * @returns {Promise<Events | null>} The event.
   */
  async getEvents(): Promise<Events | null> {
    const res = await request(
      `${process.env.API_URL}/events/recent`,
      true,
    );
    return res;
  }

  /**
   * Gets the stats.
   *
   * @returns {Promise<Stats | null>} The stats.
   */
  async getStats(): Promise<Stats | null> {
    const res = await request(
      `${process.env.ARMORY_API_URL}/stats`,
      true,
    );
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
   * Gets the player.
   *
   * @param battleTag - The battle tag.
   * @param heroId  - The hero id.
   * @returns {PlayerDetails | null} The player.
   */
  async getPlayer(
    battleTag: string,
    heroId: string,
  ): Promise<PlayerDetails | null> {
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
    const res = await request(
      `${process.env.ARMORY_URL}/status`,
      true,
    );
    return res;
  }
}
