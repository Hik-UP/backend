import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { crypto } from '../../utils/cryptography.util';
import { sendEmail } from '../../utils/mail';

async function signup(req: Request, res: Response): Promise<void> {
  try {
    const hash = await bcrypt.hash(req.body.user.password, 12);
    const token = crypto.randomString(6);

    await dbUser.create({
      username: req.body.user.username,
      email: req.body.user.email,
      token: token,
      password: hash
    });
    await sendEmail({
      subject: "Vérifiez votre compte Hik'UP",
      text: `Voici votre code de vérification: ${token}`,
      to: req.body.user.email,
      from: process.env.EMAIL
    });
    logger.api.info('User creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.api.error('User creation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

const signupCtrl = {
  signup
};

export { signupCtrl };
