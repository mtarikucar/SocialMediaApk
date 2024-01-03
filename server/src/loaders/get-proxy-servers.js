import axios from "axios";
import {getRedisClient} from "./redis.js";
function parseProxyList(proxyData) {
    const proxyList = proxyData.split('\n');
    return proxyList.map(proxy => {
        const [ip, port] = proxy.split(':');
        return { ip, port: parseInt(port, 10) };
    });
}

export async function fetchAndSaveProxies() {
    try {
        const redisClient = getRedisClient();
        const response = await axios.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=300&country=all&ssl=all&anonymity=all');
        const proxyList = parseProxyList(response.data);
        await redisClient.del('proxyList');
        await redisClient.set('proxyList', JSON.stringify(proxyList));
    } catch (error) {
        console.error('Error fetching and saving proxy list:', error);
    }
}

