import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { IUserToken } from '../../ts/user.type';
import { dbUser } from '../../models/user/user.model';
import { token } from '../user/token/token.util';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';

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
      expiresIn: '24h',
      algorithm: 'RS256'
    };
    const user = await dbUser.findSecrets({ email: req.body.user.email });
    let mailToken: IUserToken | undefined = undefined;
    if (!user) {
      throw new HttpError(401, 'Unauthorized');
    }
    mailToken = user.tokens.find((value) => value.type === 0);
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
      mailToken !== undefined &&
      !token.type0.verify(mailToken, req.body.verify.token)
    ) {
      throw new HttpError(401, 'Unauthorized');
    } else if (
      !user.isVerified &&
      req.body.verify !== undefined &&
      mailToken !== undefined &&
      token.type0.verify(mailToken, req.body.verify.token)
    ) {
      await token.type0.success(user.id, mailToken.id);
    }

    const jwToken = jwt.sign(
      { user: { id: user.id, roles: userRoles } },
      privateKeySecrets,
      signOptions
    );
    logger.api.info('User login succeed');
    res.status(200).json({
      user: { id: user.id, roles: userRoles, token: jwToken }
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
  login
};

export { loginCtrl };
