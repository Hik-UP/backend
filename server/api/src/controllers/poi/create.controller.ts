import { Request, Response } from 'express';

import { logger } from '../../utils/logger.util';
import { dbPOI } from '../../models/poi/poi.model';

async function create(req: Request, res: Response): Promise<void> {
  try {
    await dbPOI.create({
      creatorId: req.body.user.id,
      trailId: req.body.trail.id,
      latitude: req.body.poi.latitude,
      longitude: req.body.poi.longitude
    });
    logger.info('PointOfInterest creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.error('PointOfInterest creation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { create };
