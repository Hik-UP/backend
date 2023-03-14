import { Request, Response } from 'express';

import { dbUser } from '../../../../models/user/user.model';
import { logger } from '../../../../utils/logger.util';

async function refuse(req: Request, res: Response): Promise<void> {
  try {
    await dbUser.hike.guest.refuse(req.body.user.id, req.body.hike.id);
    logger.info('User hike refuse succeed');
    res.status(200).json({
      message: 'Updated'
    });
  } catch (error) {
    logger.error('User hike refuse failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { refuse };
