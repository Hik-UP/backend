import { Request, Response } from 'express';

import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';

async function update(req: Request, res: Response): Promise<void> {
  try {
    await dbUser.update(req.body.user.id, {
      username: req.body.user.username,
      email: req.body.user.email,
      picture: req.body.user.picture,
      fcmToken: req.body.user.fcmToken
    });

    logger.api.info('User profile update succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    logger.api.error('User profile update failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { update };
