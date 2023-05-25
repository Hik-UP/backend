import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import { logger } from '../../utils/logger.util';

interface JwtPayload {
  user: { id: string; roles: string[] };
}

async function auth(socket: Socket, next: any): Promise<void> {
  try {
    const publicKey: Buffer = fs.readFileSync('/tmp/jwt.pubkey.pem');
    const verifyOptions: jwt.VerifyOptions = {
      algorithms: ['RS256']
    };
    const queryUser: { id: string | undefined; roles: string[] | undefined } = {
      id: socket.handshake.query.id?.toString(),
      roles: socket.handshake.query.roles?.toString().split(',')
    };

    if (!socket.handshake.headers.token) {
      throw '';
    }
    const token: string = socket.handshake.headers.token.toString();
    const { user } = jwt.verify(token, publicKey, verifyOptions) as JwtPayload;

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
    next(new Error('invalid'));
  }
}

export { auth };
