import { Embed } from "./Embed";

import { BossEvent, Event, Events, HelltideEvent, LegionEvent } from "../types";

import { ARMORY_URL, CDN } from "../utils/Constants";
import { getChestsKey } from "../utils/Predict";

export const territory = {
  kehj: "Kehjistan",
  hawe: "Hawezar",
  step: "Dry Steppes",
  frac: "Fractured Peaks",
  scos: "Scosglen",
} satisfies Record<string, string>;

export class EventEmbed extends Embed {
  constructor(key: string, event: Event) {
    super();

    this.data.url = `${ARMORY_URL}/events`;

    this.data.image = {
      url: getURL(key, event),
    };
  }
}

function getURL(key: string, event: Event) {
  switch (key) {
    case Events.WorldBoss:
      event = event as BossEvent;
      return `${CDN}/map_data/worldboss/${normalize(event.zone, event.territory)}.png`;
    case Events.Helltide:
      event = event as HelltideEvent;
      return `${CDN}/map_data/helltide/${event.zone}_${getChestsKey(event)}.png`;
    case Events.Legion:
      event = event as LegionEvent;
      return `${CDN}/map_data/legion/${normalize(event.zone, event.territory!)}.png`;
    default:
      return "https://cdn.discordapp.com/attachments/1117722541209956422/1118197134924185630/no_png.png";
  }
}

function normalize(zone: string, territory?: string) {
  // Maybe toLowerCase()? But he has worked enough
  return (territory ? `${zone}_${territory}` : zone).replace(/ /g, "_");
}
