import { Request, Response } from 'express';

import { logger } from '../../utils/logger.util';
import { dbUser } from '../../models/user/user.model';
import { HttpError } from '../../utils/error.util';

async function check(req: Request, res: Response): Promise<void> {
  try {
    const isExisting = await dbUser.isExisting({ email: req.body.other.email });

    if (isExisting === false) {
      throw new HttpError(404, 'Not Found');
    }

    logger.api.info('User check succeed');
    res.status(200).json({
      message: 'OK'
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.api.warn('User check failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.api.error('User check failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { check };
