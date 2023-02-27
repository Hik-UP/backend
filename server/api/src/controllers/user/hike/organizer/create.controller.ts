import { Request, Response } from 'express';

import { dbUser } from '../../../../models/user/user.model';
import { logger } from '../../../../utils/logger.util';
import { HttpError } from '../../../../utils/error.util';

async function create(req: Request, res: Response): Promise<void> {
  try {
    const { email: userEmail } = (await dbUser.findOne(req.body.user.id)) || {};

    if (
      req.body.hike.guests &&
      req.body.hike.guests.every(
        (value: { email: string }) => value.email === userEmail
      )
    ) {
      throw new HttpError(400, 'Bad Request');
    }
    await dbUser.hike.organizer.create({
      name: req.body.hike.name,
      description: req.body.hike.description,
      organizerId: req.body.user.id,
      trailId: req.body.trail.id,
      guests: req.body.hike.guests,
      schedule: req.body.hike.schedule
        ? new Date(req.body.hike.schedule * 1000)
        : undefined
    });
    logger.info('Hike creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('Hike creation failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('Hike creation failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { create };
