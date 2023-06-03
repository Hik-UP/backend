import { Request } from 'express';
import crypto from 'crypto';

import { redis } from '../utils/redis.util';
import { logger } from '../utils/logger.util';

async function setCache(req: Request, toCache: string) {
  try {
    const route = crypto
      .createHash('sha256')
      .update(
        req.originalUrl +
          JSON.stringify((({ user, ...object }) => object)(req.body))
      )
      .digest('hex');

    await redis.set(route, JSON.stringify(toCache), {
      EX: 180,
      NX: true
    });
    logger.api.info('Set cache succeed');
  } catch (error) {
    logger.api.error('Set cache failed\n' + error);
  }
}

export { setCache };
