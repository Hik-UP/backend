import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { logger } from '../../../utils/logger.util';

async function update(req: Request, res: Response): Promise<void> {
  try {
    await dbUser.notification.update(
      req.body.user.id,
      req.body.notification.id,
      {
        read: req.body.notification.read
      }
    );

    logger.api.info('User notification update succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    logger.api.error('User notification update failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { update };
