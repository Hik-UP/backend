import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { dbUserData } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';

async function signup(req: Request, res: Response): Promise<void> {
  try {
    const hash = await bcrypt.hash(req.body.user.password, 12);

    await dbUserData.create({
      username: req.body.user.username,
      email: req.body.user.email,
      password: hash
    });
    logger.info('User creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.error('User creation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

const signupCtrl = {
  signup
};

export { signupCtrl };
