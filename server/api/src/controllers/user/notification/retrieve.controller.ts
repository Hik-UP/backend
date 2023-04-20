import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { INotification } from '../../../ts/notification.type';
import { logger } from '../../../utils/logger.util';

async function retrieve(req: Request, res: Response): Promise<void> {
  try {
    const notifications: INotification[] | null =
      await dbUser.notification.retrieve(req.body.user.id);

    logger.info('User notification recovery succeed');
    res.status(200).json({
      notifications: notifications
    });
  } catch (error) {
    logger.error('User notification recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { retrieve };
