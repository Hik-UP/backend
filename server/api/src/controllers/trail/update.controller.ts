import { Request, Response } from 'express';

import { dbTrail } from '../../models/trail/trail.model';
import { logger } from '../../utils/logger.util';

async function update(req: Request, res: Response): Promise<void> {
  try {
    await dbTrail.update({
      id: req.body.trail.id,
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
    logger.info('Trail update succeed');
    res.status(200).json({
      message: 'Updated'
    });
  } catch (error) {
    logger.error('Trail update failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { update };
