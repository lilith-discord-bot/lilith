import { Channel } from 'discord.js';
import { Repository } from 'typeorm';

import { Client } from '../../../../core/Client';
import { Guild } from '../models/Guild.model';

export class GuildRepository {
  /**
   * The client instance.
   * @type {Client}
   * @readonly
   */
  private readonly client: Client;
  /**
   * The guilds repository.
   * @type {Repository<Guild>}
   * @readonly
   */
  private readonly guilds: Repository<Guild>;

  constructor(client: Client) {
    this.client = client;
    this.guilds = client.database.getRepository(Guild);
  }

  /**
   * Find a guild by its ID.
   *
   * @param guildId - The guild ID.
   *
   * @returns Promise<Guild> - The guild.
   */
  async findOrCreate(guildId: string): Promise<Guild> {

    const cache = await this.client.cache.get(`guilds:${guildId}`);

    if (!cache) {

      let guild = await this.guilds.findOneBy({ id: guildId });

      if (!guild) {
        guild = new Guild();
        guild.id = guildId;
        await this.guilds.save(guild);
      }

      await this.client.cache.set(`guilds:${guildId}`, JSON.stringify(guild));

      return guild;

    } else return JSON.parse(cache) as Guild;
  }

  /**
   * Delete a guild.
   *
   * @param guildId - The guild ID.
   */
  async delete(guildId: string): Promise<void> {

    const guild = await this.guilds.findOneBy({ id: guildId });

    if (!guild) return;

    const cache = await this.client.cache.exists(`guilds:${guildId}`);

    if (cache) await this.client.cache.del(`guilds:${guildId}`);

    await this.guilds.delete({ id: guildId });
  }

  async updateEvent(guildId: string, event: keyof Guild['settings']['events'], data: { enabled: boolean, channel: string | null, role: string | null, schedule: boolean }): Promise<void> {

    const guild = await this.findOrCreate(guildId);

    if (!guild) return;

    try {
      // @ts-ignore
      guild.settings.events[event] = data;
      await this.guilds.save(guild);
    } catch (error) {
      this.client.logger.error(error);
    }

    const debug = await this.guilds.findOneBy({ id: guildId });

    console.log(debug?.settings);

    await this.client.cache.set(`guilds:${guildId}`, JSON.stringify(guild));
  }

  /**
   * Get all guilds.
   *
   * @returns Promise<Guild[]> - The guilds.
   */
  async getAll(): Promise<Guild[]> {
    return await this.guilds.find();
  }
}
