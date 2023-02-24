import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { logger } from '../../../utils/logger.util';

async function refuse(req: Request, res: Response): Promise<void> {
  try {
    await dbUser.hike.refuse(req.body.user.id, req.body.hike.id);
    logger.info('Hike refuse succeed');
    res.status(200).json({
      message: 'Updated'
    });
  } catch (error) {
    logger.error('Hike refuse failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { refuse };
