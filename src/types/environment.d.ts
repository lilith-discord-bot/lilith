declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_PORT: number
    }
  }
}

export {};