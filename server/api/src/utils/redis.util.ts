import * as redisClient from 'redis';

import { normalizePort } from './normalizePort.util';

function createRedis() {
  const redis: redisClient.RedisClientType = redisClient.createClient({
    socket: {
      host: `${process.env.REDIS_HOSTNAME}`,
      port: normalizePort(process.env.REDIS_PORT)
    }
  });

  redis.connect();
  return redis;
}

const redis: redisClient.RedisClientType = createRedis();

export { redis };
