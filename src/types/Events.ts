export type RawEvents = {
  boss: BossEvent;
  helltide: HelltideEvent;
  legion: LegionEvent;
};

export type BossEvent = {
  name: string;
  expectedName: string;
  nextExpectedName: string;
  timestamp: number;
  expected: number;
  nextExpected: number;
  territory: string;
  zone: string;
};

export type HelltideEvent = {
  timestamp: number;
  zone: string;
  refresh: number;
};

export type LegionEvent = {
  timestamp: number;
  territory: string;
  zone: string;
};

export enum Events {
  WorldBoss = "boss",
  Helltide = "helltide",
  Legion = "legion",
}

export type EventsList = "boss" | "helltide" | "legion";

export type Event = BossEvent | HelltideEvent | LegionEvent;
