import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === '.dev' ? '.env.dev' : '.env';
dotenv.config({ path: envFile });

const config = {
    PORT: process.env.PORT,
    REDIS_URL: process.env.REDIS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL
};


export default config;
