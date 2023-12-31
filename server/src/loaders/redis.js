import { createClient } from 'redis';

// Assuming your Redis URI is stored in a configuration file
import { redisUri } from '../config/index.js';

const connectRedis = async () => {
    const client = createClient({
        url: redisUri
    });

    client.on('error', (err) => {
        console.log('Redis Client Error', err);
    });

    try {
        await client.connect();
        console.log('Redis Connection Successful');
    } catch (err) {
        console.error('Redis Connection Error:', err);
    }
};

export default connectRedis;
