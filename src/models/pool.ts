import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql',
        pool: {
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    }
);

export { pool }