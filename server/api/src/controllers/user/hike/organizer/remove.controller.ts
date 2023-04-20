import { Request, Response } from 'express';

import { dbUser } from '../../../../models/user/user.model';
import { logger } from '../../../../utils/logger.util';

async function remove(req: Request, res: Response): Promise<void> {
  try {
    await dbUser.hike.organizer.remove(req.body.user.id, req.body.hike.id);

    logger.info('User hike deletion succeed');
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    logger.error('User hike deletion failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { remove };
