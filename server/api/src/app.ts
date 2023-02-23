import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { rateLimiter } from './middlewares/rateLimiter.middleware';
import { auth } from './middlewares/auth.middleware';
import { authRoutes } from './routes/auth.route';
import { userRoutes } from './routes/user.route';
import { skinRoutes } from './routes/skin.route';
import { POIRoutes } from './routes/poi.route';
import { trailRoutes } from './routes/trail.route';
import { hikeRoutes } from './routes/hike.route';
import { logger } from './utils/logger.util';

function createApp(): Express {
  const app: Express = express();

  app.use(express.json());

  app.use(helmet());
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(rateLimiter);
  app.use(cors({ methods: ['GET', 'POST', 'PUT'] }));

  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    logger.error('Failed to process request\n' + err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  });

  app.use('/api/auth/', authRoutes);

  app.use('/api/user/', auth, userRoutes);
  app.use('/api/skin/', auth, skinRoutes);
  app.use('/api/poi/', auth, POIRoutes);
  app.use('/api/trail/', auth, trailRoutes);
  app.use('/api/hike/', auth, hikeRoutes);

  app.use(function (req: Request, res: Response) {
    res.status(404).json({
      error: 'Not Found'
    });
  });

  return app;
}

const app: Express = createApp();

export { app };
