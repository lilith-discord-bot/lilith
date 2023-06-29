import pino from "pino";

export const createLogger = (clusterId?: string) => {
  return pino({
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "UTC:yyyy-mm-dd HH:MM:ss",
      },
    },
    base: {
      pid: clusterId,
    },
  });
};

export const Logger = createLogger();
