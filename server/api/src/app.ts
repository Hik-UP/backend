import express, { Express, Request, Response, NextFunction } from 'express';

import { userRoutes } from './routes/user';
import { logger } from './logger';

function createApp(): Express {
  const app: Express = express();

  app.use(express.json());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
  });
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });
  app.use('/api/auth/', userRoutes);
  return app;
}

const app: Express = createApp();

export { app };
