import { underscore } from 'discord.js';

import { Embed } from './Embed';

import { Context } from '../../core/Interaction';

import { PlayerArmory } from '../../types';
import { getTimestamp, secondsToDhms } from '../Commons';

export class ArmoryEmbed extends Embed {
  constructor(character: PlayerArmory, ctx: Context) {
    super();

    this.data.title = `Armory @ ${character.character} LvL. ${character.level} (${character.class})`;

    this.data.thumbnail = {
      url: ctx.client.user?.displayAvatarURL() || '',
    };

    const stats = `World Tier: ${String(
      character.worldTier + 1)}\nMonsters killed: ${character.monstersKilled.toLocaleString(
        'en-US',
      )}\nElites killed: ${character.elitesKilled.toLocaleString(
        'en-US',
      )}\nGolds collected: ${character.goldCollected.toLocaleString('en-US')}`;

    this.data.fields = [
      {
        name: underscore('Statistics'),
        value: stats,
      },
      {
        name: underscore('Character created'),
        value: getTimestamp(character.createdAt, 'f') || 'No date found',
        inline: false,
      },
      {
        name: underscore('Last login'),
        value: getTimestamp(character.lastLogin, 'R') || 'No date found',
        inline: false,
      },
      {
        name: underscore('Played time'),
        value: secondsToDhms(character.secondsPlayed) || 'No played time',
        inline: false,
      },
      {
        name: underscore('Equipped items'),
        value:
          character.equipment
            .map((item) => `${item.name} (${item.quality} ${item.itemtype})`)
            .join('\n') || 'No equipped items',
      },
      {
        name: underscore('Status'),
        value: character.dead ? 'Dead' : 'Alive',
      },
      {
        name: underscore('Mode'),
        value: character.hardcore ? 'Hardcore' : 'Softcore',
      },
    ];
  }
}
