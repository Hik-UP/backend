import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { logger } from '../../utils/logger.util';
import { authJOI } from './validator/auth/auth.validator';

interface JwtPayload {
  user: { id: string; roles: string[] };
}

async function auth(socket: Socket, next: any): Promise<void> {
  try {
    if (authJOI.payload.validate(socket.handshake.auth).error) {
      throw '';
    }

    const publicKey: Buffer = fs.readFileSync('/tmp/jwt.pubkey.pem');
    const verifyOptions: jwt.VerifyOptions = {
      algorithms: ['RS256']
    };
    const queryUser: {
      token: string | undefined;
      id: string | undefined;
      roles: string[] | undefined;
    } = {
      token: socket.handshake.auth.token?.toString(),
      id: socket.handshake.auth.id?.toString(),
      roles: socket.handshake.auth.roles?.toString().split(',')
    };

    if (!queryUser.token) {
      throw '';
    }
    const { user } = jwt.verify(
      queryUser.token,
      publicKey,
      verifyOptions
    ) as JwtPayload;

    if (!queryUser.id || queryUser.id !== user.id) {
      throw '';
    }

    if (
      !queryUser.roles ||
      queryUser.roles.length !== user.roles.length ||
      !queryUser.roles.every((role: string) => {
        return user.roles.includes(role);
      })
    ) {
      throw '';
    }

    logger.info('Socket:  User authentication succeed');
    next();
  } catch {
    logger.warn('Socket:  User authentication failed');
    next(new Error());
  }
}

export { auth };
