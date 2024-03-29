import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory, IRateLimiterOptions } from 'rate-limiter-flexible';

import { logger } from '../utils/logger.util';

function createRateLimiterMemory(): RateLimiterMemory {
  const opts: IRateLimiterOptions = {
    points: 1500,
    duration: 15 * 60
  };

  return new RateLimiterMemory(opts);
}

function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  if (req.ip) {
    rateLimiterMemory
      .consume(req.ip)
      .then(() => {
        logger.api.info(`Request ${req.method} ${req.url} allowed`);
        next();
      })
      .catch(() => {
        logger.api.warn(`Request ${req.method} ${req.url} blocked`);
        res.status(429).json({
          error: 'Too Many Requests'
        });
      });
  }
}

const rateLimiterMemory = createRateLimiterMemory();

export { rateLimiter };
