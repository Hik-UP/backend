import { Request, Response } from 'express';
import { logger } from '../../utils/logger.util';
import dbEvent from '../../models/event/event.model';

async function unparticipate(req: Request, res: Response): Promise<void> {
  try {
    await dbEvent.removeParticipant(
      req.body['user']['id'],
      req.body['event']['id']
    );

    logger.api.info('User succesful retire for the event succeed');
    res.status(200).json({
      message: 'User is removed for this event'
    });
  } catch (error) {
    logger.api.error('User remove failed failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export default unparticipate;
