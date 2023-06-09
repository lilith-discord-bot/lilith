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