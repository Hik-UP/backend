import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { IPOI } from '../../../ts/poi.type';
import { logger } from '../../../utils/logger.util';

async function retrieve(req: Request, res: Response): Promise<void> {
  try {
    const POI: {
      pointOfInterests: IPOI[] | null;
      sharedPOI: IPOI[] | null;
    } | null = await dbUser.poi.retrieve(req.body.user.id);

    logger.api.info('User POI recovery succeed');
    res.status(200).json({
      poi: {
        created: req.body.poi?.target.includes('created')
          ? POI?.pointOfInterests
          : undefined,
        shared: req.body.poi?.target.includes('shared')
          ? POI?.sharedPOI
          : undefined
      }
    });
  } catch (error) {
    logger.api.error('User POI recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { retrieve };
