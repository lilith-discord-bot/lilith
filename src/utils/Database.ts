import { Guild } from '../models/Guild.model';
import Database from '../lib/Database';

const guilds = Database.getRepository(Guild);

export const findOrCreateGuild = async (guildId: string) => {
  const guild = await guilds.findOneBy({ id: guildId });
  if (!guild) {
    const guild = new Guild();
    guild.id = guildId;
    await guilds.save(guild); 
      
    return guild;
  }
  return guild;
}

export const findAndDeleteGuild = async (guildId: string) => {
  const guild = await guilds.findOneBy({ id: guildId });
  if (!guild) return;
  guilds.remove(guild);
}

export const updateGuildSettings = async (guildId: string, settings: any) => {
  const guild = await findOrCreateGuild(guildId);
  guild.settings = settings;
  await guilds.save(guild);
  return guild;
}