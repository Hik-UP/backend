import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { ISkin } from '../../../ts/skin.type';
import { logger } from '../../../utils/logger.util';

async function locked(req: Request, res: Response): Promise<void> {
  try {
    const skins: ISkin[] | null = await dbUser.skin.locked(
      req.body.user.id
    );

    logger.info('User skin locked recovery succeed');
    res.status(200).json({
      skins: skins
    });
  } catch (error) {
    logger.error('User skin locked recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { locked };
