import { Embed } from "./Embed";

import { Player } from "../types";

import { getArmoryLink } from "../utils/Commons";

export class leaderboardEmbed extends Embed {
  constructor(leaderboard: Player[] | null) {
    super();

    this.data.title = "Leaderboard - Top 10";

    this.data.fields = leaderboard
      ? leaderboard
          .map((player: Player, index: number) => {
            const value = player.kills ? `Kills: ${player.kills}` : `Level: ${player.level}`;

            return {
              name: `#${index + 1} ${player.name} (${player.class})`,
              value: value.concat(` - [See armory](${getArmoryLink(player.battleTag, player.heroId)})`),
            };
          })
          .slice(0, 10)
      : [
          {
            name: "No player found.",
            value: "Try again later.",
          },
        ];
  }
}
