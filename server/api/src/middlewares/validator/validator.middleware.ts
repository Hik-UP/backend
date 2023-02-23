import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';

function validator(schema: Joi.ObjectSchema<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (schema.validate(req.body).error) {
        throw new HttpError(400, 'Bad Request');
      }

      logger.info('Schema validation succeed');
      next();
    } catch (error) {
      if (error instanceof HttpError) {
        console.log(schema.validate(req.body).error);
        logger.warn('Schema validation failed');
        res.status(error.statusCode).json({
          error: error.message
        });
      } else {
        logger.error('Schema validation failed\n' + error);
        res.status(500).json({
          error: 'Internal Server Error'
        });
      }
    }
  };
}

export { validator };
