import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
  InteractionResponse,
} from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../core/Client";
import { Context, Interaction } from "../../core/Interaction";

import { clientSymbol } from "../../utils/Constants";
import { MapEmbed } from "../../embeds/MapEmbed";

const nodes = [
  {
    name: "Alchemist",
    value: "alchemists",
  },
  {
    name: "Lilith's Altar",
    value: "altars",
  },
  {
    name: "Cellar",
    value: "cellars",
  },
  {
    name: "Dungeon",
    value: "dungeons",
  },
  {
    name: "Campaign Dungeon",
    value: "campaignDungeons",
  },
  {
    name: "Side Quest Dungeon",
    value: "sideQuestDungeons",
  },
  {
    name: "Healer",
    value: "healers",
  },
  {
    name: "Jeweler",
    value: "jewelers",
  },
  {
    name: "Occultist",
    value: "occultists",
  },
  {
    name: "Stable Master",
    value: "stableMasters",
  },
  {
    name: "Waypoint",
    value: "waypoints",
  },
  {
    name: "Campaign Quest",
    value: "campaignQuests",
  },
  {
    name: "Side Quest",
    value: "sideQuests",
  },
  {
    name: "Event",
    value: "events",
  },
];

@injectable()
export default class Map extends Interaction {
  public readonly enabled = true;

  public readonly category = "Diablo 4";

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "map",
    description: "Give information about specific things on the map.",
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "type",
        description: "The type of thing you want to know about.",
        choices: nodes,
        required: true,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: "query",
        description: "The name of the thing you want to know about.",
        required: true,
        autocomplete: true,
      },
    ],
  };

  constructor(@inject(clientSymbol) private client: Client) {
    super();
  }

  public async run(
    interaction: ChatInputCommandInteraction<CacheType>,
    { i18n }: Context
  ): Promise<InteractionResponse<boolean>> {
    const { options } = interaction;

    const query = options.getString("query", true);
    const type = options.getString("type", true);

    if (!query) return await interaction.reply(i18n.misc.INVALID_QUERY());

    let [name] = query.split("/@");

    name = name.replace(/%20/g, " ");

    let description = "";

    const data = await this.client.cache.get(`map:${type}`);

    if (data) description = JSON.parse(data).find((node: any) => node.name === name)?.description;

    const embed = new MapEmbed(name, description, query);

    return await interaction.reply({ embeds: [embed] });
  }

  public async autocomplete(interaction: AutocompleteInteraction<CacheType>): Promise<any> {
    const type = interaction.options.getString("type", true);

    if (!type) return await interaction.respond([]);

    let data = await this.client.cache.get(`map:${type}`);

    if (!data) return await interaction.respond([]);

    let nodes = JSON.parse(data) as any[];

    const value = interaction.options.getFocused();

    nodes = [
      ...nodes?.filter((node: any) => node.name.toLowerCase().indexOf(value.toLowerCase()) === 0),
      ...nodes?.filter((node: any) => node.name.toLowerCase().indexOf(value.toLowerCase()) > 0),
    ].slice(0, 25);

    await interaction.respond(
      nodes.map((node: any) => ({
        name: type === "altars" ? `${node.name} (${node.description})` : node.name,
        value: encodeURI(`${node.name}/@${node.x},${node.y}`),
      }))
    );
  }
}
