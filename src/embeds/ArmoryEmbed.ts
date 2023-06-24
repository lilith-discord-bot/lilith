import { underscore } from "discord.js";

import { Embed } from "./Embed";

import { PlayerArmory } from "../types";
import { getTimestamp, secondsToDhms } from "../utils/Commons";
import { Context } from "../core/Interaction";

export class ArmoryEmbed extends Embed {
  constructor(character: PlayerArmory, { i18n }: Context) {
    super();

    this.data.title = `${character.character} LvL. ${character.level} (${character.class})`;

    this.data.thumbnail = {
      url: this.client.user?.displayAvatarURL() || "",
    };

    const stats = i18n.embeds.ARMORY.STATISTICS_VALUE({
      worldTier: String(character.worldTier + 1),
      monstersKilled: character.monstersKilled.toLocaleString("en-US"),
      elitesKilled: character.elitesKilled.toLocaleString("en-US"),
      goldCollected: character.goldCollected.toLocaleString("en-US"),
    });

    this.data.fields = [
      {
        name: underscore(i18n.embeds.ARMORY.STATISTICS_TITLE()),
        value: stats,
      },
      {
        name: underscore(i18n.embeds.ARMORY.CHARACTER_CREATION_TITLE()),
        value: getTimestamp(character.createdAt, "f") || i18n.misc.NO_DATE_FOUND(),
        inline: false,
      },
      {
        name: underscore(i18n.embeds.ARMORY.LAST_PLAYED_TITLE()),
        value: getTimestamp(character.lastLogin, "R") || i18n.misc.NO_DATE_FOUND(),
        inline: false,
      },
      {
        name: underscore(i18n.embeds.ARMORY.PLAYED_TIME_TITLE()),
        value: secondsToDhms(character.secondsPlayed) || i18n.misc.NO_PLAYED_TIME(),
        inline: false,
      },
      {
        name: underscore(i18n.embeds.ARMORY.EQUIPPED_ITEMS_TITLE()),
        value:
          character.equipment.map((item) => `${item.name} (${item.quality} ${item.itemtype})`).join("\n") ||
          i18n.misc.NO_EQUIPPED_ITEMS(),
      },
      {
        name: underscore(i18n.embeds.ARMORY.STATUS_TITLE()),
        value: character.dead ? "Dead" : "Alive",
      },
      {
        name: underscore(i18n.embeds.ARMORY.MODE_TITLE()),
        value: character.hardcore ? "Hardcore" : "Softcore",
      },
    ];
  }
}
