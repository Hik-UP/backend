import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { notification } from '../../../utils/notification.util';
import { logger } from '../../../utils/logger.util';
import { HttpError } from '../../../utils/error.util';

async function create(req: Request, res: Response): Promise<void> {
  try {
    const { email: userEmail } = (await dbUser.findOne(req.body.user.id)) || {};

    req.body.hike.guests?.forEach((value: { email: string }) => {
      if (value.email === userEmail) {
        throw new HttpError(400, 'Bad Request');
      }
    });
    await notification.send({
      receiversEmail: req.body.hike.guests?.map(
        (value: { email: string }) => value.email
      ),
      title: 'Hike invitation',
      body: "You've received an invitation to participate in a hike"
    });
    await dbUser.hike.create({
      name: req.body.hike.name,
      description: req.body.hike.description,
      organizerId: req.body.user.id,
      trailId: req.body.trail.id,
      guests: req.body.hike.guests,
      schedule: req.body.hike.schedule
        ? new Date(req.body.hike.schedule * 1000)
        : undefined
    });

    logger.info('User hike creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('User hike creation failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('User hike creation failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { create };
