declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      ARMORY_URL: string;
      ARMORY_API_URL: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_PASSWORD: string;
    }
  }
}

export {};
