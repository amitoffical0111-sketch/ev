const Redis = require('ioredis');

let redis = null;

const connectRedis = () => {
  try {
    redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      retryStrategy: (times) => Math.min(times * 50, 2000),
      lazyConnect: true,
    });
    redis.on('connect', () => console.log('Redis Connected'));
    redis.on('error', (err) => console.log('Redis Error:', err.message));
  } catch (err) {
    console.log('Redis not available, using memory cache');
  }
};

const getCache = async (key) => {
  if (!redis) return null;
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
};

const setCache = async (key, data, ttl = 300) => {
  if (!redis) return;
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch {}
};

const delCache = async (key) => {
  if (!redis) return;
  try {
    if (key.endsWith('*')) {
      const keys = await redis.keys(key);
      if (keys.length) await redis.del(...keys);
    } else {
      await redis.del(key);
    }
  } catch {}
};

module.exports = { connectRedis, getCache, setCache, delCache };
