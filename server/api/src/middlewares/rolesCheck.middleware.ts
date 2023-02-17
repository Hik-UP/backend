import { Request, Response, NextFunction } from 'express';

import { dbUser } from '../models/user/user.model';
import { logger } from '../utils/logger.util';

function rolesCheck(allowRoles: string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { roles: userRoles } =
        (await dbUser.findOne(req.body.user.id)) || {};

      if (
        !userRoles ||
        userRoles.every((role: string) => !allowRoles.includes(role))
      ) {
        throw '';
      }

      logger.info('User role verification succeed');
      next();
    } catch {
      logger.warn('User role verification failed');
      res.status(401).json({
        error: 'Unauthorized'
      });
    }
  };
}

export { rolesCheck };
