import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { dbUserData } from '../../models/user/data.model';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../errors';

interface PrivateKeySecrets {
  key: Buffer;
  passphrase: string;
}

async function login(req: Request, res: Response): Promise<void> {
  try {
    const privateKeySecrets: PrivateKeySecrets = {
      key: fs.readFileSync('/tmp/jwt.privkey.pem'),
      passphrase: fs.readFileSync('/tmp/jwt.privkey.passphrase', 'utf8')
    };
    const signOptions: jwt.SignOptions = {
      expiresIn: '1h',
      algorithm: 'RS256'
    };
    const user = await dbUserData.findSecrets(req.body.user.email);
    if (!user) {
      throw new HttpError(401, 'Unauthorized');
    }
    const { roles: userRoles } = (await dbUserData.findOne(user.id)) || {};
    if (!userRoles) {
      throw new HttpError(401, 'Unauthorized');
    }

    if (!(await bcrypt.compare(req.body.user.password, user.password))) {
      throw new HttpError(401, 'Unauthorized');
    }

    const accessToken = jwt.sign(
      { user: { id: user.id, roles: userRoles } },
      privateKeySecrets,
      signOptions
    );
    logger.info('User login succeed');
    res.status(200).json({
      user: { id: user.id, roles: userRoles },
      accessToken: accessToken
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('User login failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('User login failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

const loginCtrl = {
  login
};

export { loginCtrl };
