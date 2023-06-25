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

export type PlayerResearch = {
  error?: string;
  dungeons_completed: number;
  players_killed: number;
  bosses_killed: number;
  characters: [
    {
      name: string;
      id: string;
      class: string;
      level: number;
      lastUpdate: string;
    }
  ];
};

export type PlayerArmory = {
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
