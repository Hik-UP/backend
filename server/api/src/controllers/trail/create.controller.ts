import { Request, Response } from 'express';

import { dbTrail } from '../../models/trail/trail.model';
import { logger } from '../../utils/logger.util';

async function create(req: Request, res: Response): Promise<void> {
  try {
    await dbTrail.create({
      name: req.body.trail.name,
      address: req.body.trail.address,
      description: req.body.trail.description,
      pictures: req.body.trail.pictures,
      latitude: req.body.trail.latitude,
      longitude: req.body.trail.longitude,
      difficulty: req.body.trail.difficulty,
      duration: req.body.trail.duration,
      distance: req.body.trail.distance,
      uphill: req.body.trail.uphill,
      downhill: req.body.trail.downhill,
      tools: req.body.trail.tools,
      relatedArticles: req.body.trail.relatedArticles,
      labels: req.body.trail.labels,
      geoJSON: req.body.trail.geoJSON
    });
    logger.api.info('Trail creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.api.error('Trail creation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { create };
