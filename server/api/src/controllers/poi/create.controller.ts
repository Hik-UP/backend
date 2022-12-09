import { Request, Response } from 'express';

import { logger } from '../../utils/logger.util';
import { HttpError } from '../../errors';
import { dbPOI } from '../../models/poi.model';

async function create(req: Request, res: Response): Promise<void> {
  try {
    await dbPOI.create({
      creatorId: req.body.user.id,
      latitude: req.body.poi.latitude,
      longitude: req.body.poi.longitude
    });
    logger.info('PointOfInterest creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('PointOfInterest creation failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('PointOfInterest creation failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { create };
