import { underscore } from "discord.js";

import { Embed } from "./Embed";

import { PlayerArmory } from "../types";
import { getTimestamp, secondsToDhms } from "../utils/Commons";
import { Context } from "../structures/Interaction";

export class ArmoryEmbed extends Embed {
  constructor(character: PlayerArmory, { i18n }: Context) {
    super();

    this.data.title = `${character.character} LvL. ${character.level} (${character.class})`;

    this.data.thumbnail = {
      url: this.client.user?.displayAvatarURL(),
    };

    const stats = i18n.embeds.ARMORY.STATISTICS_VALUE({
      worldTier: String(character.worldTier + 1),
      monstersKilled: character.monstersKilled ? character.monstersKilled.toLocaleString("en-US") : "0",
      elitesKilled: character.elitesKilled ? character.elitesKilled.toLocaleString("en-US") : "0",
      goldCollected: character.goldCollected ? character.goldCollected.toLocaleString("en-US") : "0",
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
    ];

    if (character.skills.length)
      this.data.fields.push({
        name: underscore(i18n.embeds.ARMORY.SKILLS_TITLE()),
        value: character.skills.map((skill) => skill.name).join("\n"),
        inline: false,
      });

    if (character.equipment.length) {
      const uniques = character.equipment.filter((item) => item.quality_level === "Unique");
      if (uniques.length) {
        this.data.fields.push({
          name: underscore(i18n.embeds.ARMORY.UNIQUES_TITLE()),
          value: uniques.map((item) => item.name).join("\n"),
          inline: false,
        });
      }
    }

    this.data.fields.push({
      name: underscore(i18n.embeds.ARMORY.MODE_TITLE()),
      value: character.hardcore ? "Hardcore" : "Softcore",
    });

    if (character.hardcore) {
      this.data.fields.push({
        name: underscore(i18n.embeds.ARMORY.STATUS_TITLE()),
        value: character.dead ? "Dead" : "Alive",
      });
    }

    if (character.clan) {
      this.data.fields.push({
        name: underscore(i18n.embeds.ARMORY.CLAN_TITLE()),
        value: character.clan,
      });
    }
  }
}
