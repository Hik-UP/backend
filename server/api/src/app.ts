import express, { Express } from 'express';

import { rateLimiter } from './middlewares/rateLimiter.middleware';
import { authRoutes } from './routes/auth.route';
import { POIRoutes } from './routes/poi.route';
import { trailRoutes } from './routes/trail.route';

function createApp(): Express {
  const app: Express = express();

  app.use(express.json());
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(rateLimiter);

  app.use('/api/auth/', authRoutes);
  app.use('/api/poi/', POIRoutes);
  app.use('/api/trail/', trailRoutes);

  return app;
}

const app: Express = createApp();

export { app };
