import { Request, Response } from 'express';

import { dbSkin } from '../../models/skin/skin.model';
import { ISkin } from '../../ts/skin.type';
import { logger } from '../../utils/logger.util';

async function retrieve(req: Request, res: Response): Promise<void> {
  try {
    const skins: ISkin[] | null = await dbSkin.retrieve();

    logger.api.info('Skin recovery succeed');
    res.status(200).json({
      skins: skins
    });
  } catch (error) {
    logger.api.error('Skin recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { retrieve };
