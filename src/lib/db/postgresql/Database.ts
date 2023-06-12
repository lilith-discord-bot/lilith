import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { isDev } from '../../../utils/Commons';

import { Guild } from './models/Guild.model';

export const database = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: isDev,
  entities: [Guild],
});
