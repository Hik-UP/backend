import { Request, Response } from 'express';
import { logger } from '../../utils/logger.util';
import dbEvent from '../../models/event/event.model';

async function participate(req: Request, res: Response): Promise<void> {
  try {
    await dbEvent.update(req.body['event']['id'], {
      participants: { push: req.body['user']['id'] }
    });

    logger.api.info('Event participation succeed');
    res.status(200).json({
      message: 'User is being a part of this event'
    });
  } catch (error) {
    logger.api.error('User participation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export default participate;
