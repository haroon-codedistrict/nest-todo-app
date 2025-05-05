import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { resolve } from 'path';

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

export default new DataSource({
    type: 'postgres',
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: parseInt(DB_PORT ?? '5432'),
    synchronize: false,
    entities: [resolve(__dirname, '..', 'entities', '*.entity{.ts,.js}')],
    migrations: ['src/database/migrations/*-migration.ts'],
    logging: true,
});
