export interface BaseEvent {
  timestamp: number;
  zone: string;
}

export interface BossEvent extends BaseEvent {
  name: string;
  expectedName: string;
  nextExpectedName: string;
  expected: number;
  nextExpected: number;
  territory: string;
}

export interface HelltideEvent extends BaseEvent {
  refresh: number;
}

export interface LegionEvent extends BaseEvent {
  territory: string;
}

export type Event = BossEvent | HelltideEvent | LegionEvent;

export type RawEvents = {
  [Events.WorldBoss]: BossEvent;
  [Events.Helltide]: HelltideEvent;
  [Events.Legion]: LegionEvent;
};

export enum Events {
  WorldBoss = "boss",
  Helltide = "helltide",
  Legion = "legion",
  BlizzardUpdates = "blizzard-updates",
}

export type EventsList = keyof RawEvents | Events.BlizzardUpdates;
