import { Request, Response } from 'express';

import { dbUser } from '../../../../models/user/user.model';
import { logger } from '../../../../utils/logger.util';

async function leave(req: Request, res: Response): Promise<void> {
  try {
    await dbUser.hike.organizer.leave(req.body.user.id, req.body.hike.id);

    logger.api.info('User hike leaving succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    logger.api.error('User hike leaving failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { leave };
