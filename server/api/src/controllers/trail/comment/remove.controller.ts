import { Request, Response } from 'express';

import { dbTrail } from '../../../models/trail/trail.model';
import { logger } from '../../../utils/logger.util';

async function remove(req: Request, res: Response): Promise<void> {
  try {
    await dbTrail.comment.remove(req.body.user.id, req.body.comment.id);

    logger.api.info('Trail comment deletion succeed');
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    logger.api.error('Trail comment deletion failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { remove };
