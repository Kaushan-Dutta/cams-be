import { createClient } from 'redis';
import config from './node.config';

const client = createClient({
    url: config.REDIS_URL
});

client.on('error', err => console.log('Redis Client Error', err));

export default client;