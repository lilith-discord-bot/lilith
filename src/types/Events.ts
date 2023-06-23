export type Events = {
  boss: Event;
  helltide: Event;
  legion: Event;
};

export type Event = {
  name?: string;
  expectedName: string;
  nextExpectedName: string;
  timestamp: number;
  expected: number;
  nextExpected: number;
  refresh?: number;
  territory?: string;
  zone: string;
};

export type EventsList = "boss" | "helltide" | "legion";
