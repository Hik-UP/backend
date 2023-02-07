import { Request, Response } from 'express';

import { logger } from '../../utils/logger.util';
import { dbPOI } from '../../models/poi/poi.model';
import { IPOI } from '../../ts/poi.type';

async function retrieve(req: Request, res: Response): Promise<void> {
  try {
    const POI: IPOI[] | null = await dbPOI.retrieve();

    logger.info('PointOfInterest recovery succeed');
    res.status(200).json({
      poi: POI
    });
  } catch (error) {
    logger.error('PointOfInterest recovery failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { retrieve };
