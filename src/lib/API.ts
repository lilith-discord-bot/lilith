import { request } from '../utils/Commons';

/**
 * The class type.
 * @type {Classe}
 */
export type Classes =
  | 'allclasses'
  | 'Barbarian'
  | 'Druid'
  | 'Necromancer'
  | 'Rogue'
  | 'Sorcerer';

/**
 * The class choices.
 * @type {ClassesChoices}
 */
export type ClassesChoices = {
  name: string;
  value: Classes;
};

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

/**
 * The mode type.
 * @type {Mode}
 */
export type Modes = 'allmodes' | 'softcore' | 'hardcore' | 'dead' | 'pvp';

export type ModesChoices = {
  name: string;
  value: Modes;
};

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

export type Player = {
  battleTag: string;
  heroId: string;
  name: string;
  class: string;
  kills?: number;
  level?: number;
  skills: string[];
  hardcore: boolean;
  dead: boolean;
  lastUpdate: number;
};

export type PlayerDetails = {
  character: string;
  lastUpdate: string;
  accountLastUpdate: string;
  class: string;
  level: number;
  skills: Skill[];
  equipment: Equipment[];
  secondsPlayed: number;
  lastLogin: number;
  worldTier: number;
  createdAt: number;
  monstersKilled: number;
  elitesKilled: number;
  goldCollected: number;
  power: number;
  hardcore: boolean;
  dead: boolean;
};

export type Equipment = {
  name: string;
  tex: number;
  itemtype: string;
  power: number;
  quality: string;
  affixes: string[];
};

export type Skill = {
  name: string;
  desc: string;
};

export default class API {
  /**
   * Gets the leaderboard.
   *
   * @param classe - The class.
   * @param mode - The mode.
   *
   * @returns {Promise<any>} The leaderboard.
   */
  async getLeaderboard(
    classe: Classes = 'allclasses',
    mode: Modes = 'allmodes',
  ): Promise<Player[] | null> {
    const res = await request(
      `${process.env.API_URL}/leaderboard/${classe}/${mode}`,
      true,
    );
    return res;
  }

  /**
   * Gets the player.
   *
   * @param battleTag - The battle tag.
   * @param heroId  - The hero id.
   * @returns - The player.
   */
  async getPlayer(
    battleTag: string,
    heroId: string,
  ): Promise<PlayerDetails | null> {
    const res = await request(
      `${process.env.API_URL}/${battleTag}/${heroId}`,
      true,
    );
    return res;
  }
}
