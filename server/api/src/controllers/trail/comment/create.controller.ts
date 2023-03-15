import { Request, Response } from 'express';

import { dbTrail } from '../../../models/trail/trail.model';
import { logger } from '../../../utils/logger.util';

async function create(req: Request, res: Response): Promise<void> {
  try {
    await dbTrail.comment.create({
      authorId: req.body.user.id,
      trailId: req.body.trail.id,
      body: req.body.trail.comment.body,
      pictures: req.body.trail.comment.pictures
    });
    logger.info('Trail comment creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.error('Trail comment creation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { create };
