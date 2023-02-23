import { Request, Response } from 'express';

import { dbHike } from '../../models/hike/hike.model';
import { logger } from '../../utils/logger.util';

async function accept(req: Request, res: Response): Promise<void> {
  try {
    await dbHike.accept(req.body.user.id, req.body.hike.id);
    logger.info('Hike accept succeed');
    res.status(200).json({
      message: 'Updated'
    });
  } catch (error) {
    logger.error('Hike accept failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { accept };
