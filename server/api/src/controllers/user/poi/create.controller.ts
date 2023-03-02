import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { logger } from '../../../utils/logger.util';
import { HttpError } from '../../../utils/error.util';

async function create(req: Request, res: Response): Promise<void> {
  try {
    const { email: userEmail } = (await dbUser.findOne(req.body.user.id)) || {};

    req.body.poi.sharedWith?.forEach((value: { email: string }) => {
      if (value.email === userEmail) {
        throw new HttpError(400, 'Bad Request');
      }
    });
    dbUser;
    await dbUser.poi.create({
      name: req.body.poi.name,
      description: req.body.poi.description,
      pictures: req.body.poi.pictures,
      creatorId: req.body.user.id,
      sharedWith: req.body.poi.sharedWith,
      trailId: req.body.trail.id,
      latitude: req.body.poi.latitude,
      longitude: req.body.poi.longitude
    });
    logger.info('User POI creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('User POI creation failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('User POI creation failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { create };
