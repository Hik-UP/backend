import { Request, Response } from 'express';

import { dbTrail } from '../../../models/trail/trail.model';
import { logger } from '../../../utils/logger.util';

async function update(req: Request, res: Response): Promise<void> {
  try {
    await dbTrail.comment.update(req.body.user.id, {
      id: req.body.comment.id,
      body: req.body.comment.body,
      pictures: req.body.comment.pictures
    });

    logger.info('Trail comment update succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    logger.error('Trail comment update failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { update };
