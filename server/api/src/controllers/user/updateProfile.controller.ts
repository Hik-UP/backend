import { Request, Response } from 'express';
import { dbUserData } from '../../models/user/data.model';
import { logger } from '../../utils/logger.util';

async function updateProfile(req: Request, res: Response): Promise<void> {
  try {
    await dbUserData.update(req.body.user.id, req.body.picture);

    logger.info('User picture update by ' + req.body.picture);
    res.status(200).json({ msg: 'Successfully' });
  } catch (e) {
    logger.error('User profile recovery failed\n' + e);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { updateProfile };
