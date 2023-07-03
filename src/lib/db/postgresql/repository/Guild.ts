import { Prisma } from "@prisma/client";

import { Repository } from "./Base";

import { Locales } from "../../../../i18n/i18n-types";
import { EventsList } from "../../../../types";
import { Guild } from "../../../../types/Database";
import { Snowflake } from "discord.js";

export class GuildRepository extends Repository {
  /**
   * The guilds repository.
   * @type {Prisma.GuildDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>}
   * @readonly
   */
  private readonly guilds: Prisma.GuildDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

  constructor() {
    super();
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
        try {
          guild = await this.guilds.create({
            data: {
              guildId,
            },
            include: { events: true },
          });
        } catch (error) {
          this.client.logger.error(`Failed to create guild ${guildId}.`, error);
        }
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
  async delete(guildId: Snowflake): Promise<void> {
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
    guildId: Snowflake,
    type: EventsList,
    data: { channel: string; role: string | null; schedule: boolean }
  ): Promise<void> {
    let guild = await this.findOrCreate(guildId, true);

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
      this.client.logger.error(`Failed to create event ${type} for guild ${guildId}.`, error.message);
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
    guildId: Snowflake,
    type: EventsList,
    data: { channel: string; role: string | null; schedule: boolean }
  ): Promise<void> {
    let guild = await this.findOrCreate(guildId, true);

    if (!guild) return;

    try {
      guild = await this.guilds.update({
        data: {
          events: {
            update: {
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
            },
          },
        },
        where: {
          guildId: guildId,
        },
        include: {
          events: true,
        },
      });
    } catch (error) {
      this.client.logger.error(`Failed to update event ${type} for guild ${guildId}.`, error.message);
    }

    await this.client.cache.set(`guilds:${guildId}`, JSON.stringify(guild));
  }

  /**
   * Update an event message ID.
   *
   * @param guildId - The guild ID.
   * @param type - The event type.
   * @param channelId - The channel ID.
   * @param messageId - The message ID.
   */
  async updateEventMessageId(
    guildId: Snowflake,
    type: EventsList,
    channelId: Snowflake,
    messageId: Snowflake
  ): Promise<void> {
    let guild = await this.findOrCreate(guildId, true);

    if (!guild) return;

    try {
      guild = await this.guilds.update({
        data: {
          events: {
            update: {
              data: {
                messageId,
              },
              where: {
                type_channelId: {
                  type,
                  channelId,
                },
              },
            },
          },
        },
        where: {
          guildId,
        },
        include: {
          events: true,
        },
      });
    } catch (error) {
      this.client.logger.error(`Failed to update event ${type} for guild ${guildId}.`, error.message);
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
  async removeEvent(guildId: Snowflake, type: EventsList, channelId: string): Promise<void> {
    let guild = await this.findOrCreate(guildId, true);

    if (!guild) return;

    try {
      guild = await this.guilds.update({
        data: {
          events: {
            delete: {
              type_channelId: {
                type,
                channelId,
              },
            },
          },
        },
        where: {
          guildId,
        },
        include: {
          events: true,
        },
      });
    } catch (error) {
      this.client.logger.error(`Failed to remove event ${type} for guild ${guildId}.`, error.message);
    }

    await this.client.cache.set(`guilds:${guildId}`, JSON.stringify(guild));
  }

  /**
   * Update the locale for a guild.
   *
   * @param guildId - The guild ID.
   * @param locale - The locale.
   */
  async updateLocale(guildId: Snowflake, locale: Locales): Promise<void> {
    let guild = await this.findOrCreate(guildId, true);

    if (!guild) return;

    try {
      guild = await this.guilds.update({
        data: {
          locale,
        },
        where: {
          guildId,
        },
        include: {
          events: true,
        },
      });
    } catch (error) {
      this.client.logger.error(`Failed to update locale for guild ${guildId}.`, error.message);
    }

    await this.client.cache.set(`guilds:${guildId}`, JSON.stringify(guild));
  }

  /**
   * Delete a configured channel.
   *
   * @param guildId - The guild ID.
   * @param channelId - The channel ID.
   */
  async deleteChannel(guildId: Snowflake, channelId: Snowflake): Promise<void> {
    let guild = await this.findOrCreate(guildId, true);

    if (!guild) return;

    try {
      guild = await this.guilds.update({
        data: {
          events: {
            deleteMany: {
              channelId,
            },
          },
        },
        where: {
          guildId,
        },
        include: {
          events: true,
        },
      });
    } catch (error) {
      this.client.logger.error(`Failed to delete channel ${channelId} for guild ${guildId}.`, error.message);
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
    return await this.guilds.findMany({ where: { events: { some: { type: event } } }, include: { events: true } });
  }
}
