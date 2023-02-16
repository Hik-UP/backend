import { Request, Response } from 'express';
import { dbUserData } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';

async function updateProfile(req: Request, res: Response): Promise<void> {
  try {
    logger.info('Update profile');
    const picture = req.body.user.picture;
    if (picture === '' || picture === null || picture === undefined) {
      throw new HttpError(400, 'Picture is required');
    }
    await dbUserData.updateProfile(req.body.user.id, req.body.user.picture);

    logger.info('User picture update by ' + req.body.user.picture);
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('User profile update failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { updateProfile };
