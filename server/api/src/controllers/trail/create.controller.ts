import { Request, Response } from 'express';

import { logger } from '../../utils/logger.util';
import { dbTrail } from '../../models/trail/trail.model';

async function create(req: Request, res: Response): Promise<void> {
  try {
    await dbTrail.create({
      name: req.body.trail.name,
      description: req.body.trail.description,
      pictures: req.body.trail.pictures,
      latitude: req.body.trail.latitude,
      longitude: req.body.trail.longitude,
      difficulty: req.body.trail.difficulty,
      duration: req.body.trail.duration,
      distance: req.body.trail.distance,
      uphill: req.body.trail.uphill,
      downhill: req.body.trail.downhill,
      labels: req.body.trail.labels,
      geoJSON: req.body.trail.geoJSON
    });
    logger.info('Trail creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.error('Trail reation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { create };
