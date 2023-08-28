import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { logger } from '../../../utils/logger.util';

async function unlocked(req: Request, res: Response): Promise<void> {
  try {
    const { skins: skins } =
      (await dbUser.skin.unlocked(req.body.user.id)) || {};

    logger.api.info('User skin unlocked recovery succeed');
    res.status(200).json({
      skins: skins
    });
  } catch (error) {
    logger.api.error('User skin unlocked recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { unlocked };
