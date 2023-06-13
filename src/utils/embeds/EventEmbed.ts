import { Embed } from './Embed';

import { Context } from '../../core/Interaction';
import { Event } from '../../types';
import { time } from 'discord.js';

// TODO refactor
export class EventEmbed extends Embed {
  constructor(
    key: string,
    event: Event,
    ctx: Context,
  ) {
    super();

    this.data.title = getTitle(key, event);

    this.data.url = `${process.env.ARMORY_URL}/events`;

    this.data.image = {
      url: getURL(key, event),
    }
  }
}

function getTitle(key: string, event: Event) {

  event.timestamp = event.timestamp / 1000;

  switch (key) {
    case 'boss':
      return `${event.name} appears in ${event.zone} at ${time(event.timestamp, 'T')}`;
    case 'helltide':
      return `Helltide spawns in ${time(event.timestamp, 'R')} until ${time(event.timestamp + 3600, 'T')}`;
    case 'legion':
      return `Legion spawns in ${time(event.timestamp, 'R')}, next legion at ${time(event.timestamp + 1800, 'T')}`;
    default:
      return key;
  }
}

function getURL(key: string, event: Event) {
  switch (key) {
    case 'boss':
      return `${process.env.ARMORY_URL}/img/territories/${encodeURI(event.territory!)}.webp`;
    case 'helltide':
      return `${process.env.ARMORY_URL}/img/helltides/${encodeURI(event.zone)}Helltide.webp`;
    case 'legion':
      return `${process.env.ARMORY_URL}/img/territories/${encodeURI(event.territory!)}.webp`;
    default:
      return key;
  }
}
