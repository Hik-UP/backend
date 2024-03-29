import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { logger } from '../../../utils/logger.util';
import { HttpError } from '../../../utils/error.util';
import { IPOI } from '../../../ts/poi.type';

async function remove(req: Request, res: Response): Promise<void> {
  try {
    const isCreator = (
      await dbUser.poi.retrieve(req.body.user.id)
    )?.pointOfInterests?.find((value: IPOI) => value.id === req.body.poi.id)
      ? true
      : false;

    await dbUser.poi.remove(req.body.user.id, req.body.poi.id, isCreator);

    logger.api.info('User POI deletion succeed');
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.api.warn('User POI update failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.api.error('User POI deletion failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { remove };
