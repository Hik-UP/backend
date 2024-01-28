import { Request, Response } from 'express';

import { IUserToken } from '../../ts/user.type';
import { token } from './token/token.controller';
import { sendEmail } from '../../utils/mail';
import { crypto } from '../../utils/cryptography.util';
import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';

async function update(req: Request, res: Response): Promise<void> {
  try {
    const user = await dbUser.findOne(req.body.user.id);
    const secrets = await dbUser.findSecrets({
      id: req.body.user.id
    });
    if (!user || !secrets) {
      throw '';
    }
    const mailToken: IUserToken | undefined = secrets.tokens.find(
      (value) => value.type === 1
    );

    if (
      req.body.user.email !== user?.email &&
      ((req.body.user.email && mailToken == undefined) ||
        (mailToken !== undefined &&
          req.body.user.email &&
          mailToken.store !== req.body.user.email))
    ) {
      const newMailToken = {
        type: 1,
        value: crypto.randomString(6),
        store: req.body.user.email
      };
      await sendEmail({
        subject: "Vérifiez votre nouvelle adresse Email Hik'UP",
        text: `Voici votre code de vérification: ${newMailToken.value}`,
        to: req.body.user.email,
        from: process.env.EMAIL
      });
      await dbUser.update(req.body.user.id, {
        username: req.body.user.username,
        picture: req.body.user.picture,
        fcmToken: req.body.user.fcmToken
      });
      await dbUser.tokens.create(req.body.user.id, newMailToken);
      throw new HttpError(403, 'Forbidden');
    } else if (
      (mailToken !== undefined && req.body.user.email === user?.email) ||
      (req.body.user.email !== user?.email &&
        req.body.verify &&
        mailToken !== undefined &&
        token.type1.verify(mailToken, req.body.verify.token))
    ) {
      await dbUser.update(req.body.user.id, {
        username: req.body.user.username,
        email: req.body.user.email,
        picture: req.body.user.picture,
        fcmToken: req.body.user.fcmToken
      });
      token.type1.success(req.body.user.id, mailToken.id);
    } else if (
      req.body.user.email &&
      mailToken !== undefined &&
      req.body.user.email !== user.email &&
      req.body.user.email === mailToken.store &&
      !req.body.verify
    ) {
      throw new HttpError(403, 'Forbidden');
    } else if (
      req.body.user.email &&
      req.body.user.email !== user.email &&
      ((req.body.verify &&
        mailToken !== undefined &&
        !token.type1.verify(mailToken, req.body.verify.token)) ||
        (mailToken !== undefined && !req.body.verify))
    ) {
      throw new HttpError(401, 'Unauthorized');
    } else if (req.body.user.email === user.email || !req.body.verify) {
      await dbUser.update(req.body.user.id, {
        username: req.body.user.username,
        picture: req.body.user.picture,
        fcmToken: req.body.user.fcmToken
      });
    } else {
      throw '';
    }

    logger.api.info('User profile update succeed');
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.api.warn('User profile update failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.api.error('User profile update failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { update };
