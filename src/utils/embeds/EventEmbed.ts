import { Embed } from "./Embed";

import { Context } from "../../core/Interaction";
import { Event } from "../../types";
import { time } from "discord.js";
import { ARMORY_URL } from "../Constants";

// TODO refactor
export class EventEmbed extends Embed {
  constructor(key: string, event: Event, ctx: Context) {
    super();

    this.data.url = `${ARMORY_URL}/events`;

    this.data.image = {
      url: getURL(key, event),
    };

    this.data.footer = {
      text: key,
    };
  }
}

function getURL(key: string, event: Event) {
  switch (key) {
    case "boss":
      return `${ARMORY_URL}/img/territories/${encodeURI(event.territory!)}.webp`;
    case "helltide":
      return `${ARMORY_URL}/img/helltides/${encodeURI(event.zone)}Helltide.webp`;
    case "legion":
      return `${ARMORY_URL}/img/territories/${encodeURI(event.territory!)}.webp`;
    default:
      return "https://cdn.discordapp.com/attachments/1117722541209956422/1118197134924185630/no_png.png";
  }
}
