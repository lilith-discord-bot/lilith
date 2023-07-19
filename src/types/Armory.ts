export type Leaderboard = {
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

export type Account = SuccessfulAccount | ErrorAccount;

export interface SuccessfulAccount {
  dungeons_completed: number;
  players_killed: number;
  bosses_killed: number;
  clan_id: string;
  clan_tag: string | null;
  characters: AccountCharacter[];
}

export interface AccountCharacter {
  name: string;
  id: string;
  class: string;
  level: number;
  lastUpdate: string;
  hardcore: boolean;
  seasonal: boolean;
}

export interface Character {
  character: string;
  queue: number;
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
  playersKilled: number;
  goldCollected: number;
  power: number;
  hardcore: boolean;
  seasonal: boolean;
  dead: boolean;
  clan: string;
  season: number;
}

export interface ErrorAccount {
  error: string;
}

export type Skill = {
  name: string;
  desc: string;
};

export type Equipment = {
  name: string;
  tex: number;
  itemtype: string;
  power: number;
  required_level: number;
  upgrades: number;
  quality_level: string;
  quality_modifier: number;
  base_affixes: string[];
  strikethrough_affixes: string[];
  added_affixes: string[];
};
