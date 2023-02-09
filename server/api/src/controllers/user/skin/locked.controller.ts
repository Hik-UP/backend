import { Request, Response } from 'express';

import { dbUserData } from '../../../models/user/user.model';
import { ISkin } from '../../../ts/skin.type';
import { logger } from '../../../utils/logger.util';

async function locked(req: Request, res: Response): Promise<void> {
  try {
    const skins: ISkin[] | null = await dbUserData.skin.locked(
      req.body.user.id
    );

    logger.info('User skin locked recovery succeed');
    res.status(200).json({
      skins: skins
    });
  } catch (error) {
    logger.error('User skin locked recovery succeed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { locked };
