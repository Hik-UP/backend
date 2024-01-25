import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { IUserSecrets } from '../../ts/user.type';
import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';

interface PrivateKeySecrets {
  key: Buffer;
  passphrase: string;
}

function verify(user: IUserSecrets, token: string): boolean {
  if (user.token === token) {
    return true;
  } else {
    return false;
  }
}

async function login(req: Request, res: Response): Promise<void> {
  try {
    const privateKeySecrets: PrivateKeySecrets = {
      key: fs.readFileSync('/tmp/jwt.privkey.pem'),
      passphrase: fs.readFileSync('/tmp/jwt.privkey.passphrase', 'utf8')
    };
    const signOptions: jwt.SignOptions = {
      expiresIn: '24h',
      algorithm: 'RS256'
    };
    const user = await dbUser.findSecrets({ email: req.body.user.email });
    if (!user) {
      throw new HttpError(401, 'Unauthorized');
    }
    const { roles: userRoles } = (await dbUser.findOne(user.id)) || {};
    if (!userRoles) {
      throw new HttpError(401, 'Unauthorized');
    }

    if (!(await bcrypt.compare(req.body.user.password, user.password))) {
      throw new HttpError(401, 'Unauthorized');
    }
    if (!user.isVerified && req.body.verify === undefined) {
      throw new HttpError(403, 'Forbidden');
    } else if (
      !user.isVerified &&
      req.body.verify !== undefined &&
      !verify(user, req.body.verify.token)
    ) {
      throw new HttpError(401, 'Unauthorized');
    } else if (
      !user.isVerified &&
      req.body.verify !== undefined &&
      verify(user, req.body.verify.token)
    ) {
      await dbUser.verify(user.id);
    }

    const token = jwt.sign(
      { user: { id: user.id, roles: userRoles } },
      privateKeySecrets,
      signOptions
    );
    logger.api.info('User login succeed');
    res.status(200).json({
      user: { id: user.id, roles: userRoles, token: token }
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.api.warn('User login failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.api.error('User login failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

const loginCtrl = {
  login,
  verify
};

export { loginCtrl };
