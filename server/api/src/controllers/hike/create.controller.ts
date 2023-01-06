import { Request, Response } from 'express';

import { logger } from '../../utils/logger.util';
import { dbHike } from '../../models/hike.model';

async function create(req: Request, res: Response): Promise<void> {
  try {
    await dbHike.create({
      name: req.body.hike.name,
      description: req.body.hike.description,
      picture: req.body.hike.picture,
      latitude: req.body.hike.latitude,
      longitude: req.body.hike.longitude,
      difficulty: req.body.hike.difficulty,
      duration: req.body.hike.duration,
      distance: req.body.hike.distance,
      uphill: req.body.hike.uphill,
      downhill: req.body.hike.downhill,
      label: req.body.hike.label
    });
    logger.info('hike creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.error('hike reation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { create };
