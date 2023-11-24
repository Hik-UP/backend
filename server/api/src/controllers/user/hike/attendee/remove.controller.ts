import { Request, Response } from 'express';

import { dbUser } from '../../../../models/user/user.model';
import { logger } from '../../../../utils/logger.util';
import { HttpError } from '../../../../utils/error.util';
import { IUserPublicProfile } from '../../../../ts/user.type';

async function remove(req: Request, res: Response): Promise<void> {
  try {
    const { username: username } =
      (await dbUser.findOne(req.body.user.id)) || {};
    const { organizers: organizers } =
      (await dbUser.hike.findOne(req.body.hike.id)) || {};

    if (
      username &&
      organizers
        ?.map((value: IUserPublicProfile) => value.username)
        .includes(username)
    ) {
      throw new HttpError(400, 'Bad Request');
    }
    await dbUser.hike.attendee.remove(req.body.user.id, req.body.hike.id);

    logger.api.info('User hike remove succeed');
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.api.warn('User hike remove failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.api.error('User hike remove failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { remove };
