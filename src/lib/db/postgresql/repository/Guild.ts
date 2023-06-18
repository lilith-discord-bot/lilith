import { container } from "tsyringe";

import { Client } from "../../../../core/Client";
import { clientSymbol } from "../../../../utils/Constants";
import { Event, Prisma } from "@prisma/client";
import { EventsList } from "../../../../types";
import { Guild } from "../../../../types/Database";

export class GuildRepository {
  /**
   * The client instance.
   * @type {Client}
   * @readonly
   */
  private readonly client: Client;

  /**
   * The guilds repository.
   * @type {Prisma.GuildDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>}
   * @readonly
   */
  private readonly guilds: Prisma.GuildDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

  constructor() {
    this.client = container.resolve<Client>(clientSymbol);
    this.guilds = this.client.database.guild;
  }

  /**
   * Find a guild by its ID.
   *
   * @param guildId - The guild ID.
   *
   * @returns Promise<Guild> - The guild.
   */
  async findOrCreate(guildId: string, skipCache?: boolean): Promise<Guild> {
    const cache = await this.client.cache.get(`guilds:${guildId}`);

    if (!cache || !!skipCache) {
      let guild = await this.guilds.findUnique({ where: { guildId }, include: { events: true } });

      if (!guild) {
        guild = await this.guilds.create({
          data: {
            guildId,
          },
          include: { events: true },
        });
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
    const guild = await this.guilds.findUnique({ where: { guildId } });

    if (!guild) return;

    const cache = await this.client.cache.exists(`guilds:${guildId}`);

    if (cache) await this.client.cache.del(`guilds:${guildId}`);

    await this.guilds.delete({ where: { guildId } });
  }

  /**
   * Create an event for a guild.
   *
   * @param guildId - The guild ID.
   * @param type - The event type.
   * @param data - The event data.
   */
  async createEvent(
    guildId: string,
    type: EventsList,
    data: { channel: string; role: string | null; schedule: boolean }
  ): Promise<void> {
    let guild = await this.findOrCreate(guildId);

    if (!guild) return;

    try {
      guild = await this.guilds.update({
        data: {
          events: {
            create: {
              type,
              channelId: data.channel,
              messageId: null,
              roleId: data.role,
            },
          },
        },
        where: {
          guildId,
        },
        include: { events: true },
      });
    } catch (error) {
      this.client.logger.error(error);
    }

    await this.client.cache.set(`guilds:${guildId}`, JSON.stringify(guild));
  }

  /**
   * Update an event for a guild.
   *
   * @param guildId - The guild ID.
   * @param type - The event type.
   * @param data - The event data.
   */
  async updateEvent(
    guildId: string,
    type: EventsList,
    data: { channel: string; role: string | null; schedule: boolean }
  ): Promise<void> {
    let guild = await this.findOrCreate(guildId);

    if (!guild) return;

    try {
      await this.client.database.event.update({
        data: {
          channelId: data.channel,
          roleId: data.role,
        },
        where: {
          type_channelId: {
            type,
            channelId: data.channel,
          },
        },
      });
    } catch (error) {
      this.client.logger.error(error);
    }

    await this.client.cache.set(`guilds:${guildId}`, JSON.stringify(guild));
  }

  /**
   * Remove an event from a guild.
   *
   * @param guildId - The guild ID.
   * @param type - The event type.
   * @param channelId - The channel ID.
   */
  async removeEvent(guildId: string, type: EventsList, channelId: string): Promise<void> {
    let guild = await this.findOrCreate(guildId);

    if (!guild) return;

    try {
      await this.client.database.event.delete({ where: { type_channelId: { type, channelId } } });

      guild = await this.findOrCreate(guildId, true);
    } catch (error) {
      this.client.logger.error(error);
    }

    await this.client.cache.set(`guilds:${guildId}`, JSON.stringify(guild));
  }

  /**
   * Get all guilds.
   *
   * @returns Promise<Guild[]> - The guilds.
   */
  async getAll(): Promise<Guild[]> {
    return await this.guilds.findMany({ include: { events: true } });
  }

  /**
   * Get all guilds that have a specific event enabled.
   *
   * @param event - The event.
   * @returns - The guilds.
   */
  async getAllByEvent(event: EventsList): Promise<Guild[]> {
    const guilds = await this.guilds.findMany({ where: { events: { some: { type: event } } }, include: { events: true } });
    return guilds;
  }
}
