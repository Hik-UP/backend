import express, { Express, Request, Response, NextFunction } from 'express';

import { userRoutes } from './routes/user';
import { rateLimiter } from './middleware/rateLimiter';

function createApp(): Express {
  const app: Express = express();

  app.use(express.json());
  app.disable('x-powered-by');
  app.use(rateLimiter);
  app.use('/api/auth/', userRoutes);
  return app;
}

const app: Express = createApp();

export { app };
