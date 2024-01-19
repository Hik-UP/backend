import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { logger } from '../utils/logger.util';

interface JwtPayload {
  user: { id: string; roles: string[] };
}

async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const publicKey: Buffer = fs.readFileSync('/tmp/jwt.pubkey.pem');
    const verifyOptions: jwt.VerifyOptions = {
      algorithms: ['RS256']
    };

    if (!req.headers.authorization) {
      throw '';
    }
    const token: string = req.headers.authorization.split(' ')[1];
    const { user } = jwt.verify(token, publicKey, verifyOptions) as JwtPayload;

    if (!req.body.user.id || req.body.user.id !== user.id) {
      throw '';
    }

    if (
      !req.body.user.roles ||
      req.body.user.roles.length !== user.roles.length ||
      !req.body.user.roles.every((role: string) => {
        return user.roles.includes(role);
      })
    ) {
      throw '';
    }

    logger.api.info('User authentication succeed');
    next();
  } catch {
    logger.api.warn('User authentication failed');
    res.status(401).json({
      error: 'Token expired or invalid'
    });
  }
}

export { auth };
