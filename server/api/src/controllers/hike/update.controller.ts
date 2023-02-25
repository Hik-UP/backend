import { Request, Response } from 'express';

import { dbHike } from '../../models/hike/hike.model';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';
import { dbUser } from '../../models/user/user.model';

async function update(req: Request, res: Response): Promise<void> {
  try {
    const { email: userEmail } = (await dbUser.findOne(req.body.user.id)) || {};

    if (
      req.body.hike.guests?.add &&
      (await dbHike.isUserInHike(
        req.body.hike.id,
        req.body.hike.guests.add.map((value: { email: string }) => value.email)
      ))
    ) {
      throw new HttpError(400, 'Bad Request');
    }
    if (
      req.body.hike.attendees?.remove &&
      req.body.hike.attendees.remove.every(
        (value: { email: string }) => value.email === userEmail
      )
    ) {
      throw new HttpError(400, 'Bad Request');
    }
    await dbHike.update(req.body.user.id, {
      id: req.body.hike.id,
      name: req.body.hike.name,
      description: req.body.hike.description,
      trailId: req.body.trail?.id,
      attendees: req.body.hike.attendees,
      guests: req.body.hike.guests,
      schedule: req.body.hike.schedule
    });

    logger.info('Hike update succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('Hike update failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('Hike update failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { update };
