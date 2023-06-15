import {
    ApplicationCommandData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    AutocompleteInteraction,
    CommandInteraction,
    hyperlink
} from 'discord.js';

import { Context, Interaction } from '../../core/Interaction';

import { DATABASE_URL, discordToLanguage } from '../../utils/Constants';


export default class Item extends Interaction {

    static enabled = true;

    static command: ApplicationCommandData = {
        type: ApplicationCommandType.ChatInput,
        name: 'item',
        description: 'Give information about specific item.',
        options: [
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

        const [url, label] = query.split(':');

        await interaction.reply(hyperlink(`See ${label} on Diablo 4 Database`, `${DATABASE_URL}/${url}`, 'Click here to see the Diablo 4 Database'));
    }

    static async autocomplete(
        interaction: AutocompleteInteraction,
        ctx: Context,
    ): Promise<any> {

        const language = discordToLanguage[interaction.guild?.preferredLocale || interaction.locale] || 'us';

        let data = await ctx.client.cache.get(`database:${language}`);

        if (!data)
            return await interaction.respond([]);

        let items = JSON.parse(data) as {
            value: string;
            desc: string;
            label: string;
        }[];

        const value = interaction.options.getFocused();

        items = [
            ...items?.filter((item) => item.label.toLowerCase().indexOf(value.toLowerCase()) === 0),
            ...items?.filter((item) => item.label.toLowerCase().indexOf(value.toLowerCase()) > 0),
        ].slice(0, 25);

        await interaction.respond(items.map((item) => ({
            name: `${item.label} (${item.desc})`,
            value: `${language}/${item.value}:${item.label}`,
        })));
    }
}