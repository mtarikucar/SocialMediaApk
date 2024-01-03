import axios from 'axios';
import {getRedisClient} from "../../loaders/redis.js";
import {fetchAndSaveProxies} from "../../loaders/get-proxy-servers.js";


async function getProxiesFromRedis() {
    const redis = getRedisClient();
    const data = await redis.get('proxyList');
    return data ? JSON.parse(data) : [];
}

async function makeRequestWithProxy(url, retries = 0) {
    try {

        if (retries === 0) {
            return await makeRequest(url);
        }


        let proxyList = await getProxiesFromRedis();
        if (proxyList.length === 0) {
            await fetchAndSaveProxies();
            proxyList = await getProxiesFromRedis();
        }


        const proxy = proxyList[Math.floor(Math.random() * proxyList.length)];
        if (!proxy) {
            throw new Error('No proxy available');
        }


        return await makeRequest(url, proxy);
    } catch (error) {
        console.error('Error:', error.response?.status, error.response?.statusText);


        if (error.response && (error.response.status === 429 || error.response.status === 403 || error.response.status === 501)) {
            const waitTime = (error.response.status === 429) ? 3000 : 1000;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }


        if (retries >= 3) {
            throw error;
        }


        return makeRequestWithProxy(url, retries + 1);
    }
}

async function makeRequest(url, proxy = null) {
    const axiosConfig = {
        headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'}
    };

    if (proxy) {
        axiosConfig.proxy = {
            protocol: "http",
            host: proxy.ip,
            port: proxy.port
        };
    }

    const { data } = await axios.get(url, axiosConfig);
    return data;
}


export {makeRequestWithProxy};
