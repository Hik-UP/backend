import { Request, Response } from 'express';

import { dbUserData } from '../../../models/user/user.model';
import { logger } from '../../../utils/logger.util';

async function unlocked(req: Request, res: Response): Promise<void> {
  try {
    const { skinList: skins } =
      (await dbUserData.skin.unlocked(req.body.user.id)) || {};

    logger.info('User skin unlocked recovery succeed');
    res.status(200).json({
      skins: skins
    });
  } catch (error) {
    logger.error('User skin unlocked recovery succeed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { unlocked };
