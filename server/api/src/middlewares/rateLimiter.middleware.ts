import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory, IRateLimiterOptions } from 'rate-limiter-flexible';

import { logger } from '../utils/logger';

function createRateLimiterMemory(): RateLimiterMemory {
  const opts: IRateLimiterOptions = {
    points: 100,
    duration: 15 * 60
  };

  return new RateLimiterMemory(opts);
}

function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  rateLimiterMemory
    .consume(req.ip)
    .then(() => {
      logger.info(`Request ${req.method} ${req.url} allowed`);
      next();
    })
    .catch(() => {
      logger.warn(`Request ${req.method} ${req.url} blocked`);
      res.status(429).json({
        error: 'Too Many Requests'
      });
    });
}

const rateLimiterMemory = createRateLimiterMemory();

export { rateLimiter };
