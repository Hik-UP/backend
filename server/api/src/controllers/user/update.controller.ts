import { Request, Response } from 'express';

import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';

async function update(req: Request, res: Response): Promise<void> {
  try {
    await dbUser.update(req.body.user.id, {
      username: req.body.user.username,
      email: req.body.user.email,
      picture: req.body.user.picture
    });

    logger.info('User profile update succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('User profile update failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { update };