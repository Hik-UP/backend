import express, { Express } from 'express';

import { rateLimiter } from './middlewares/rateLimiter.middleware';
import { auth } from './middlewares/auth.middleware';
import { authRoutes } from './routes/auth.route';
import { userRoutes } from './routes/user.route';
import { skinRoutes } from './routes/skin.route';
import { POIRoutes } from './routes/poi.route';
import { trailRoutes } from './routes/trail.route';

function createApp(): Express {
  const app: Express = express();

  app.use(express.json());
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(rateLimiter);

  app.use('/api/auth/', authRoutes);

  app.use('/api/user/', auth, userRoutes);
  app.use('/api/skin/', auth, skinRoutes);
  app.use('/api/poi/', auth, POIRoutes);
  app.use('/api/trail/', auth, trailRoutes);

  return app;
}

const app: Express = createApp();

export { app };
