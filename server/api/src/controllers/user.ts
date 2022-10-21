import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import * as userCtrl from '../prisma/user';
import { AuthSecrets } from '../prisma/user.types';
import { logger } from '../logger';

interface PrivateKeySecrets {
  key: Buffer;
  passphrase: string;
}

function signup(req: Request, res: Response): void {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash: string) => {
      userCtrl
        .create({
          email: req.body.email,
          password: hash
        })
        .then(() => {
          logger.info('User creation succeed');
          return res.status(201).json({
            message: 'Created'
          });
        })
        .catch((error: Error) => {
          logger.info('User creation failed' + error.message);
          return res.status(500).json({
            error: 'Internal Server Error'
          });
        });
    })
    .catch((error: Error) => {
      logger.error('User creation failed\n' + error.message);
      return res.status(500).json({
        error: 'Internal Server Error'
      });
    });
}

function login(req: Request, res: Response): void {
  const privateKeySecrets: PrivateKeySecrets = {
    key: fs.readFileSync('/tmp/jwt.privkey.pem'),
    passphrase: fs.readFileSync('/tmp/jwt.privkey.passphrase', 'utf8')
  };
  const signOptions: jwt.SignOptions = {
    expiresIn: '1h',
    algorithm: 'RS256'
  };

  userCtrl
    .findAuthSecrets(req.body.email)
    .then((user: AuthSecrets | null) => {
      if (!user) {
        logger.info('User login failed');
        return res.status(401).json({
          error: 'Unauthorized'
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid: boolean) => {
          if (!valid) {
            logger.info('User login failed');
            return res.status(401).json({
              error: 'Unauthorized'
            });
          }
          const token = jwt.sign(
            { userId: user.id },
            privateKeySecrets,
            signOptions
          );
          logger.info('User login succeed');
          return res.status(200).json({
            userId: user.id,
            token: token
          });
        })
        .catch((error: Error) => {
          logger.error('User login failed\n' + error.message);
          return res.status(500).json({
            error: 'Internal Server Error'
          });
        });
    })
    .catch((error: Error) => {
      logger.error('User login failed\n' + error.message);
      return res.status(500).json({
        error: 'Internal Server Error'
      });
    });
}

function test(): void {
  console.log('OK');
}

export { signup, login, test };
