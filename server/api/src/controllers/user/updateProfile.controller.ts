import { Request, Response } from 'express';
import { dbUserData } from '../../models/user/data.model';
import { logger } from '../../utils/logger.util';

async function updateProfile(req: Request, res: Response): Promise<void> {
  try {
    logger.info('Update profile');
    await dbUserData.updateProfile(req.body.user.id, req.body.user.picture);

    logger.info('User picture update by ' + req.body.user.picture);
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    logger.error('User profile update failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { updateProfile };
