import { Request, Response } from 'express';

import { dbHike } from '../../models/hike/hike.model';
import { IHike } from '../../ts/hike.type';
import { logger } from '../../utils/logger.util';

async function retrieve(req: Request, res: Response): Promise<void> {
  try {
    const hikes: {
      organizerHikes: IHike[] | null;
      attendeeHikes: IHike[] | null;
      guestHikes: IHike[] | null;
    } | null = await dbHike.retrieve(req.body.user.id);

    logger.info('Hike recovery succeed');
    res.status(200).json({
      hikes: {
        organized: req.body.hike?.target.includes('organized')
          ? hikes?.organizerHikes
          : undefined,
        attendee: req.body.hike?.target.includes('attendee')
          ? hikes?.attendeeHikes
          : undefined,
        guest: req.body.hike?.target.includes('guest')
          ? hikes?.guestHikes
          : undefined
      }
    });
  } catch (error) {
    logger.error('Hike recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { retrieve };
