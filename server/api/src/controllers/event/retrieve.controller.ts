import { Request, Response } from 'express';
import { logger } from '../../utils/logger.util';
import dbEvent from '../../models/event/event.model';
import { IEvent } from '../../ts/event.type';
import { VisibilityEvent } from '@prisma/client';

async function retrieve(req: Request, res: Response): Promise<void> {
  try {
    const visibility = req.body['visibility'] || VisibilityEvent.PUBLIC;
    const events: IEvent[] | null = await dbEvent.retrieve(visibility);

    logger.api.info('Event recovery succeed');
    res.status(200).json({
      events: events
    });
  } catch (error) {
    logger.api.error('Event recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export default retrieve;
