import { Embed } from "./Embed";

import { Event } from "../../types";
import { ARMORY_URL, CDN } from "../Constants";

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
      return `${CDN}/map_data/worldboss/${normalize(event.zone, event.territory!)}.png`;
    case "helltide":
      return `${CDN}/map_data/helltide/${normalize(territory[event.zone])}.png`;
    case "legion":
      return `${CDN}/map_data/legion/${normalize(event.zone, event.territory!)}.png`;
    default:
      return "https://cdn.discordapp.com/attachments/1117722541209956422/1118197134924185630/no_png.png";
  }
}

function normalize(zone: string, territory?: string) {
  // Maybe toLowerCase()? But he has worked enough
  return (territory ? `${zone}_${territory}` : zone).replace(/ /g, "_");
}
