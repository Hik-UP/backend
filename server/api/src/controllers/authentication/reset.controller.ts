import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';
import { sendEmail } from '../../utils/mail';
import { crypto } from '../../utils/cryptography.util';
import { IUserToken } from '../../ts/user.type';
import { token } from '../user/token/token.controller';

async function password(req: Request, res: Response): Promise<void> {
  try {
    const secrets = await dbUser.findSecrets({
      email: req.body.user.email
    });
    if (!secrets) {
      throw '';
    }
    const mailToken: IUserToken | undefined = secrets.tokens.find(
      (value) => value.type === 2
    );
    if (mailToken === undefined) {
      const newMailToken = {
        type: 2,
        value: crypto.randomString(6),
        store: JSON.stringify({ count: 1 })
      };
      await sendEmail({
        subject: "Réinitialisez votre mot de passe Hik'UP",
        text: `Voici votre code de vérification: ${newMailToken.value}`,
        to: req.body.user.email,
        from: process.env.EMAIL
      });
      await dbUser.tokens.create(secrets.id, newMailToken);
      throw new HttpError(403, 'Forbidden');
    } else if (
      (mailToken !== undefined &&
        !req.body.user.password &&
        req.body.verify &&
        token.type2.verify(mailToken, req.body.verify.token)) ||
      (mailToken !== undefined &&
        mailToken.email === req.body.user.email &&
        !req.body.user.password &&
        !req.body.verify)
    ) {
      throw new HttpError(403, 'Forbidden');
    } else if (
      mailToken !== undefined &&
      req.body.user.password &&
      token.type2.verify(mailToken, req.body.verify.token)
    ) {
      const hash = await bcrypt.hash(req.body.user.password, 12);

      await dbUser.secrets.update(
        { email: req.body.user.email },
        { password: hash }
      );
      token.type2.success(secrets.id, mailToken.id);
    } else {
      throw new HttpError(401, 'Unauthorized');
    }

    logger.api.info('User secrets update succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.api.warn('User secrets update failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.api.error('User secrets update failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

const resetCtrl = {
  password
};

export { resetCtrl };
