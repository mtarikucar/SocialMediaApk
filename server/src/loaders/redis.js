// redisClient.js
import { createClient } from 'redis';
import {redisUri} from "../config/index.js";


let client;

const connectRedis = async () => {
    if (!client) {
        client = createClient({
            url: redisUri
        });
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        console.log('Redis client connected')
    }

    return client;
};

export const getRedisClient = () => {
    if (!client) {
        throw new Error("Redis client has not been initialized. Call connectRedis first.");
    }
    return client;
};

export default connectRedis;
