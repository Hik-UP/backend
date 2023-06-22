import { Request, Response } from 'express';
import { logger } from '../../utils/logger.util';
import dbEvent from '../../models/event/event.model';

export default async function create(
  req: Request,
  res: Response
): Promise<void> {
  try {
    await dbEvent.create({ ...req.body });
    logger.api.info('Event creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.api.error('Event creation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}
