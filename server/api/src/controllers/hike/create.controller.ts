import { Request, Response } from 'express';

import { dbHike } from '../../models/hike/hike.model';
import { logger } from '../../utils/logger.util';

async function create(req: Request, res: Response): Promise<void> {
  try {
    await dbHike.create({
      name: req.body.hike.name,
      description: req.body.hike.description,
      organizerId: req.body.user.id,
      trailId: req.body.trail.id,
      guests: req.body.hike.guests,
      schedule: req.body.hike.schedule
        ? new Date(req.body.hike.schedule * 1000)
        : undefined
    });
    logger.info('Hike creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.error('Hike creation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { create };
