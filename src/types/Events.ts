export type Events = {
  boss: Event;
  helltide: Event;
  legion: Event;
};

export type Event = {
  name?: string;
  timestamp: number;
  territory?: string;
  zone: string;
};

export type EventsList = "boss" | "helltide" | "legion";
