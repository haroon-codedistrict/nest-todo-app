import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
config(); // Configuring the env variables

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: parseInt(DB_PORT ?? '5432'),
    entities: [resolve(__dirname, '..', 'entities', '*.entity{.ts,.js}')],
};
