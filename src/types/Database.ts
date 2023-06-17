import { Guild as PrismaGuild, Event as PrismaEvent } from "@prisma/client";

export type Guild = PrismaGuild & {
  events: PrismaEvent[];
};
