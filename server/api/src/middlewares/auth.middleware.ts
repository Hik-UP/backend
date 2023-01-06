import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.util';
import fs from 'fs';

interface JwtPayload {
  userId: string;
}

async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const publicKey: Buffer = fs.readFileSync('/tmp/jwt.pubkey.pem');
  const verifyOptions: jwt.VerifyOptions = {
    algorithms: ['RS256']
  };

  try {
    if (!req.headers.authorization) {
      throw '';
    }
    const token: string = req.headers.authorization.split(' ')[1];
    const { userId } = jwt.verify(
      token,
      publicKey,
      verifyOptions
    ) as JwtPayload;
    if (req.body.userId && req.body.userId !== userId) {
      throw '';
    } else {
      logger.info('User authentication succeed');
      next();
    }
  } catch {
    logger.warn('User authentication failed');
    res.status(401).json({
      error: 'Unauthorized'
    });
  }
}

export { auth };
