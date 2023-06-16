import { createClient } from "redis";

// TODO : Make this a class ?p

export const redis = createClient({
  socket: { host: process.env.REDIS_HOST || "redis" },
  password: process.env.REDIS_PASSWORD,
});
