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
  clan_id: string;
  clan_tag: string | null;
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
  error?: string;
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
  goldCollected: number;
  power: number;
  hardcore: boolean;
  dead: boolean;
  clan: string;
  // NOT IMPLEMENTED
  // completed_quests: null;
  // fog_of_wars: null;
  // altars: null;
  // waypoints: null;
  // skillTree: null;
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

export type Skill = {
  name: string;
  desc: string;
};
