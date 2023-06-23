export * from "./Player";
export * from "./Modes";
export * from "./Events";
export * from "./Classes";

export type Status = {
  character_service: boolean;
  event_service: boolean;
};

export type Map = {
  alchemists: Alchemist[];
  altars: Altar[];
  cellars: Cellar[];
  dungeons: Dungeon[];
  campaignDungeons: CampaignDungeon[];
  sideQuestDungeons: SideQuestDungeon[];
  healers: Healer[];
  jewelers: Jeweler[];
  occultists: Occultist[];
  stableMasters: StableMaster[];
  waypoints: Waypoint[];
  campaignQuests: CampaignQuest[];
  sideQuests: SideQuest[];
  events: EventMap[];
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Alchemist = {
  name: string;
} & Coordinates;

export type Altar = {
  name: string;
  description: string;
  attribute: string;
} & Coordinates;

export type Cellar = {
  name: string;
} & Coordinates;

export type Dungeon = {
  name: string;
  description: string;
  aspect: string;
} & Coordinates;

export type CampaignDungeon = {
  name: string;
  description: string;
} & Coordinates;

export type SideQuestDungeon = {
  name: string;
  description: string;
} & Coordinates;

export type Healer = {
  name: string;
} & Coordinates;

export type Jeweler = {
  name: string;
} & Coordinates;

export type Occultist = {
  name: string;
} & Coordinates;

export type StableMaster = {
  name: string;
} & Coordinates;

export type Waypoint = {
  name: string;
} & Coordinates;

export type CampaignQuest = {
  name: string;
  description: string;
} & Coordinates;

export type SideQuest = {
  name: string;
  description: string;
} & Coordinates;

export type EventMap = {
  name: string;
  description: string;
  zone: string;
} & Coordinates;
