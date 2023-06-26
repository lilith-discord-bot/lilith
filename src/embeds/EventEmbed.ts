import { Embed } from "./Embed";

import { BossEvent, Event, HelltideEvent, LegionEvent } from "../types";
import { ARMORY_URL, CDN } from "../utils/Constants";
import { getChestsKey } from "../utils/Predict";

export const territory = {
  kehj: "Kehjistan",
  hawe: "Hawezar",
  step: "Dry Steppes",
  frac: "Fractured Peaks",
  scos: "Scosglen",
} as Record<string, string>;

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
    case "boss":
      const boss = event as BossEvent;
      return `${CDN}/map_data/worldboss/${normalize(boss.zone, boss.territory!)}.png`;
    case "helltide":
      const helltide = event as HelltideEvent;
      return `${CDN}/map_data/helltide/${helltide.zone}_${getChestsKey(helltide)}.png`;
    case "legion":
      const legion = event as LegionEvent;
      return `${CDN}/map_data/legion/${normalize(legion.zone, legion.territory!)}.png`;
    default:
      return "https://cdn.discordapp.com/attachments/1117722541209956422/1118197134924185630/no_png.png";
  }
}

function normalize(zone: string, territory?: string) {
  // Maybe toLowerCase()? But he has worked enough
  return (territory ? `${zone}_${territory}` : zone).replace(/ /g, "_");
}
