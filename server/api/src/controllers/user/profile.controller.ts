import { Request, Response } from 'express';

import { logger } from '../../utils/logger.util';
import { dbUser } from '../../models/user/user.model';

async function profile(req: Request, res: Response): Promise<void> {
  try {
    const { roles, ...user } = (await dbUser.findOne(req.body.user.id)) || {};

    logger.api.info('User profile recovery succeed');
    res.status(200).json({
      user: user
    });
  } catch (error) {
    logger.api.error('User profile recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { profile };
