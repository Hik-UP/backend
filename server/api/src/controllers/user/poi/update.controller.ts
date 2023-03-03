import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { logger } from '../../../utils/logger.util';
import { HttpError } from '../../../utils/error.util';

async function update(req: Request, res: Response): Promise<void> {
  try {
    const { email: userEmail } = (await dbUser.findOne(req.body.user.id)) || {};

    if (
      req.body.poi.sharedWith?.add &&
      (await dbUser.poi.isUserInPOI(
        req.body.poi.id,
        req.body.poi.sharedWith.add.map(
          (value: { email: string }) => value.email
        )
      ))
    ) {
      throw new HttpError(400, 'Bad Request');
    }
    req.body.poi.sharedWith?.remove?.forEach((value: { email: string }) => {
      if (value.email === userEmail) {
        throw new HttpError(400, 'Bad Request');
      }
    });
    await dbUser.poi.update(req.body.user.id, {
      id: req.body.poi.id,
      name: req.body.poi.name,
      description: req.body.poi.description,
      pictures: req.body.poi.pictures,
      sharedWith: req.body.poi.sharedWith
    });

    logger.info('User POI update succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('User POI update failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('User POI update failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { update };
