import {
    ApplicationCommandData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    AutocompleteInteraction,
    CommandInteraction,
    hyperlink
} from 'discord.js';

import { Context, Interaction } from '../../core/Interaction';

import { MAP_URL } from '../../utils/Constants';


const nodes = [{
    name: 'Alchemist',
    value: 'alchemists',
}, {
    name: 'Lilian\'s Altar',
    value: 'altars',
}, {
    name: 'Cellar',
    value: 'cellars',
}, {
    name: 'Dungeon',
    value: 'dungeons',
}, {
    name: 'Healer',
    value: 'healers',
}, {
    name: 'Helltide Chest',
    value: 'helltideChests',
}, {
    name: 'Jeweler',
    value: 'jewelers',
}, {
    name: 'Occultist',
    value: 'occultists',
}, {
    name: 'Stable Master',
    value: 'stableMasters',
}, {
    name: 'Waypoint',
    value: 'waypoints',
}]

export default class Map extends Interaction {

    static enabled = true;

    static command: ApplicationCommandData = {
        type: ApplicationCommandType.ChatInput,
        name: 'map',
        description: 'Give information about specific things on the map.',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'type',
                description: 'The type of thing you want to know about.',
                choices: nodes,
                required: true,
            },
            {
                type: ApplicationCommandOptionType.String,
                name: 'query',
                description: 'The name of the thing you want to know about.',
                required: true,
                autocomplete: true,
            }
        ],
    };

    static async run(
        interaction: CommandInteraction,
        ctx: Context,
    ): Promise<any> {

        const { options } = interaction;

        let query = (options.get('query')?.value || null) as string;

        if (!query) return await interaction.reply('Invalid query.');

        let [name] = query.split('/@');

        name = name.replace(/%20/g, ' ');

        await interaction.reply(hyperlink(`See ${name} location on Diablo 4 Map`, `${MAP_URL}/nodes/${query}?ref=glazk0`, 'Click here to see the map'));
    }

    static async autocomplete(
        interaction: AutocompleteInteraction,
        ctx: Context,
    ): Promise<any> {

        const type = interaction.options.getString('type', true);

        if (!type) return await interaction.respond([]);

        let data = await ctx.client.cache.get(`map:${type}`);

        if (!data)
            return await interaction.respond([]);

        let nodes = JSON.parse(data) as any[];

        const value = interaction.options.getFocused();

        if (!value)
            return await interaction.respond([]);

        nodes = [
            ...nodes?.filter((node: any) => node.name.toLowerCase().indexOf(value.toLowerCase()) === 0),
            ...nodes?.filter((node: any) => node.name.toLowerCase().indexOf(value.toLowerCase()) > 0),
        ].slice(0, 25);

        await interaction.respond(nodes.map((node: any) => ({
            name: type === 'altars' ? `${node.name} (${node.description})` : node.name,
            value: encodeURI(`${node.name}/@${node.x},${node.y}`),
        })));
    }
}
