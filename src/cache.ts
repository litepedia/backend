import { createClient } from 'redis';
const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
console.log(`redis url: ${url}`);

const redisClient = createClient({
    url
});

export async function initCache() {
    if (!redisClient.isReady) {
        await redisClient.connect();
    }
}

export async function getCachedContent(key: string): Promise<string> {
    let data = await redisClient.get(key);
    if (data) {
        console.log(`cache hit ${key}`);
        return data;
    } else {
        return '';
    }
}

export async function setCachedContent(key: string, value: string) {
    await redisClient.set(key, value);
}