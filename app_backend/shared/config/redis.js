import { createClient } from 'redis';
import { config } from '../config/env.js';

const redisClient = createClient(
  {url: config.redis.url}
);


redisClient.on('error', (err) => console.error('❌ Redis error:', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('✅ Redis client connected');
    // test set/get
    await redisClient.set('testKey', 'Hello Redis');
    const value = await redisClient.get('testKey');
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
  }
})();

export default redisClient;
