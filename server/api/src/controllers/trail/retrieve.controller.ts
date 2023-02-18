import { Request, Response } from 'express';

import { dbTrail } from '../../models/trail/trail.model';
import { ITrail } from '../../ts/trail.type';
import { logger } from '../../utils/logger.util';

async function retrieve(req: Request, res: Response): Promise<void> {
  try {
    const trails: ITrail[] | null = await dbTrail.retrieve();

    logger.info('Trail recovery succeed');
    res.status(200).json({
      trails: trails
    });
  } catch (error) {
    logger.error('Trail recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { retrieve };
