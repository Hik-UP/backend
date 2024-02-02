import { Request, Response } from 'express';

import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { sendEmail } from '../../utils/mail';
import { crypto } from '../../utils/cryptography.util';

class TokenHttpError extends Error {
  statusCode: number;
  delay: number;
  constructor(statusCode: number, delay: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.delay = delay;
    Object.setPrototypeOf(this, TokenHttpError.prototype);
  }
}

async function resend(req: Request, res: Response): Promise<void> {
  try {
    const token = await dbUser.tokens.findOne(
      req.body.user.email,
      req.body.token.type
    );
    if (token === null || token.length <= 0 || token[0].store === null) {
      throw '';
    }
    const tokenStore: { email: string; count: number } = JSON.parse(
      token[0].store
    );
    const seconds = Math.abs(
      (token[0].createdAt.getTime() - Date.now()) / 1000
    );
    if (seconds < tokenStore.count * 30) {
      throw new TokenHttpError(
        403,
        tokenStore.count * 30 - seconds,
        'Forbidden'
      );
    }
    const newMailToken = crypto.randomString(6);

    await sendEmail({
      subject:
        token[0].type === 0
          ? "Vérifiez votre compte Hik'UP"
          : token[0].type === 1
          ? "Vérifiez votre nouvelle adresse Email Hik'UP"
          : "Réinitialisez votre mot de passe Hik'UP",
      text: `Voici votre code de vérification: ${newMailToken}`,
      to: tokenStore.email ?? req.body.user.email,
      from: process.env.EMAIL
    });
    tokenStore.count = tokenStore.count + 1;
    dbUser.tokens.update({
      id: token[0].id,
      value: newMailToken,
      store: JSON.stringify(tokenStore),
      createdAt: new Date()
    });

    logger.api.info('Authentication token resend succeed');
    res.status(200).json({ message: 'OK', delay: tokenStore.count * 30 });
  } catch (error) {
    if (error instanceof TokenHttpError) {
      logger.api.warn('Authentication token resend failed');
      res.status(error.statusCode).json({
        error: error.message,
        delay: error.delay
      });
    } else {
      logger.api.error('Authentication token resend failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

const tokenCtrl = {
  resend
};

export { tokenCtrl };
