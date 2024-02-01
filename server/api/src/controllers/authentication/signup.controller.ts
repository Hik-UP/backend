import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { INewUserToken } from '../../ts/user.type';
import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { crypto } from '../../utils/cryptography.util';
import { sendEmail } from '../../utils/mail';
import { HttpError } from '../../utils/error.util';

async function signup(req: Request, res: Response): Promise<void> {
  try {
    const isUserExist = await dbUser.findSecrets({ email: req.body.user.email });
    const hash = await bcrypt.hash(req.body.user.password, 12);
    const token: INewUserToken | null = {
      type: 0,
      value: crypto.randomString(6),
      store: null
    };

    if (isUserExist !== null) {
      throw new HttpError(409, 'Conflict');
    }

    await dbUser.create({
      username: req.body.user.username,
      email: req.body.user.email,
      password: hash
    });
    await sendEmail({
      subject: "Vérifiez votre compte Hik'UP",
      text: `Voici votre code de vérification: ${token.value}`,
      to: req.body.user.email,
      from: process.env.EMAIL
    });
    logger.api.info('User creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.api.error('User creation failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.api.error('User creation failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

const signupCtrl = {
  signup
};

export { signupCtrl };
