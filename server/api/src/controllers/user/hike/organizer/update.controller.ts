import { Request, Response } from 'express';

import { dbUser } from '../../../../models/user/user.model';
import { notification } from '../../../../utils/notification.util';
import { logger } from '../../../../utils/logger.util';
import { HttpError } from '../../../../utils/error.util';

async function update(req: Request, res: Response): Promise<void> {
  try {
    const { email: userEmail } = (await dbUser.findOne(req.body.user.id)) || {};

    if (
      req.body.hike.guests?.add &&
      (await dbUser.hike.isUserInHike(
        req.body.hike.id,
        req.body.hike.guests.add.map((value: { email: string }) => value.email)
      ))
    ) {
      throw new HttpError(400, 'Bad Request');
    }
    req.body.hike.attendees?.remove.forEach((value: { email: string }) => {
      if (value.email === userEmail) {
        throw new HttpError(400, 'Bad Request');
      }
    });
    await notification.send({
      receiversEmail: req.body.hike.guests?.add?.map(
        (value: { email: string }) => value.email
      ),
      title: 'Hike invitation',
      body: "You've received an invitation to participate in a hike"
    });
    await dbUser.hike.organizer.update(req.body.user.id, {
      id: req.body.hike.id,
      name: req.body.hike.name,
      description: req.body.hike.description,
      trailId: req.body.trail?.id,
      attendees: req.body.hike.attendees,
      guests: req.body.hike.guests,
      status: req.body.hike.status,
      schedule: req.body.hike.schedule
    });

    logger.api.info('User hike update succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.api.warn('User hike update failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.api.error('User hike update failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { update };
