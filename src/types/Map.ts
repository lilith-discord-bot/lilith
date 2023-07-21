export interface Node {
  name: string;
  coordinates: Coordinates;
}

export type Coordinates = {
  x: number;
  y: number;
};

export interface Alchemist extends Node {}

export interface Altar extends Node {
  description: string;
  attribute: string;
}

export interface Cellar extends Node {}

export interface Dungeon extends Node {
  description: string;
  aspect: string;
}

export interface CampaignDungeon extends Node {
  description: string;
}

export interface SideQuestDungeon extends Node {
  description: string;
}

export interface Healer extends Node {}

export interface Jeweler extends Node {}

export interface Occultist extends Node {}

export interface StableMaster extends Node {}

export interface Waypoint extends Node {}

export interface CampaignQuest extends Node {
  description: string;
}

export interface SideQuest extends Node {
  description: string;
}

export interface EventMap extends Node {
  zone: string;
}

export type Map = {
  [key: string]: Node[];
};
