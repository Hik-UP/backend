import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

import { redis } from '../utils/redis.util';
import { logger } from '../utils/logger.util';

async function cache(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const route = crypto
      .createHash('sha256')
      .update(
        req.originalUrl +
          JSON.stringify((({ user, ...object }) => object)(req.body))
      )
      .digest('hex');
    const cacheResults = await redis.get(route);

    if (cacheResults) {
      logger.info('Get cache succeed');
      res.send(JSON.parse(cacheResults));
    } else {
      next();
    }
  } catch (error) {
    logger.error('Get cache failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { cache };
