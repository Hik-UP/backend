import { Request, Response } from 'express';

import { dbHike } from '../../models/hike/hike.model';
import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';
import { IUserPublicProfile } from '../../ts/user.type';

async function leave(req: Request, res: Response): Promise<void> {
  try {
    const { username: username } =
      (await dbUser.findOne(req.body.user.id)) || {};
    const { organizers: organizers } =
      (await dbHike.findOne(req.body.hike.id)) || {};

    if (
      username &&
      organizers
        ?.map((value: IUserPublicProfile) => value.username)
        .includes(username)
    ) {
      throw new HttpError(400, 'Bad Request');
    }
    await dbHike.leave(req.body.user.id, req.body.hike.id);

    logger.info('Hike leaving succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('Hike leaving failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('Hike leaving failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { leave };
