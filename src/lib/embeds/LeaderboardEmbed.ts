import { Player } from '../API';
import { Embed } from './Embed';

const getLink = (player: Player): string => {
  return `${process.env.API_URL}/?account=${player.battleTag}&hero=${player.heroId}`;
};

export class leaderboardEmbed extends Embed {
  constructor(leaderboard: Player[] | null) {
    super();

    this.data.title = 'Leaderboard';
    this.data.color = 0xa50905;

    this.data.fields = leaderboard
      ? leaderboard
          .map((player: Player, index: number) => {
            const value = player.kills
              ? `Kills: ${player.kills}`
              : `Level: ${player.level}`;

            return {
              name: `#${index + 1} ${player.name} (${player.class})`,
              value: value.concat(` - [See armory](${getLink(player)})`),
            };
          })
          .slice(0, 10)
      : [
          {
            name: 'No player found.',
            value: 'Try again later.',
          },
        ];
  }
}
