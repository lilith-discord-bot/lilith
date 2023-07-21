export * from "./Armory";
export * from "./Modes";
export * from "./Events";
export * from "./Classes";
export * from "./Map";

export type Status = {
  character_service: boolean;
  event_service: boolean;
};

// Missing stuff but I don't care
export type RSSFeedItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: string;
  meta: {
    link: string;
  };
};

export type RSSFeed = {
  name: string;
  url: string;
  defaultAttach: string;
  footerAttach: string;
  refreshTime: number;
};
