import { Request, Response } from 'express';

import { logger } from '../../utils/logger.util';
import { dbHike } from '../../models/hike.model';
import { IHike } from '../../ts/hike.type';

async function retrieve(req: Request, res: Response): Promise<void> {
  try {
    const hike: IHike[] | null = await dbHike.retrieve();

    logger.info('hike recovery succeed');
    res.status(200).json({
      hike: hike
    });
  } catch (error) {
    logger.error('hike recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { retrieve };
