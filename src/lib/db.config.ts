import { PrismaClient } from '@prisma/client';
import config from './node.config';

if (!config || !config.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined. Please check your environment variables.');
}

export const db = new PrismaClient({
    datasources: {
        db: {
            url: config.DATABASE_URL,
        },
    },
});
