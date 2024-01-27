import { Request, Response } from 'express';

import { IUserToken } from '../../ts/user.type';
import { sendEmail } from '../../utils/mail';
import { verify } from '../../utils/verify.util';
import { crypto } from '../../utils/cryptography.util';
import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';
import { HttpError } from '../../utils/error.util';

async function update(req: Request, res: Response): Promise<void> {
  try {
    const secrets = await dbUser.findSecrets({
      id: req.body.user.id
    });
    const user = await dbUser.findOne(req.body.user.id);
    let token: IUserToken | null = null;

    if (secrets?.token) {
      token = JSON.parse(secrets.token);
    }
    if (
      req.body.user.email !== user?.email &&
      ((req.body.user.email && token == null) ||
        (token !== null &&
          req.body.user.email &&
          token.email !== req.body.user.email))
    ) {
      token = {
        type: 0,
        value: crypto.randomString(6),
        email: req.body.user.email,
        creation: Date.now()
      };
      await sendEmail({
        subject: "Vérifiez votre nouvelle adresse Email Hik'UP",
        text: `Voici votre code de vérification: ${token.value}`,
        to: req.body.user.email,
        from: process.env.EMAIL
      });
      await dbUser.update(req.body.user.id, {
        username: req.body.user.username,
        token: JSON.stringify(token),
        picture: req.body.user.picture,
        fcmToken: req.body.user.fcmToken
      });
      throw new HttpError(403, 'Forbidden');
    } else if (
      (secrets && token !== null && req.body.user.email === user?.email) ||
      (req.body.user.email !== user?.email &&
        req.body.verify &&
        token !== null &&
        secrets &&
        verify.token(token, req.body.verify.token))
    ) {
      await dbUser.update(req.body.user.id, {
        username: req.body.user.username,
        email: req.body.user.email,
        picture: req.body.user.picture,
        fcmToken: req.body.user.fcmToken
      });
      verify.success(secrets.id);
    } else if (
      req.body.user.email &&
      req.body.user.email !== user?.email &&
      ((req.body.verify &&
        token !== null &&
        secrets &&
        !verify.token(token, req.body.verify.token)) ||
        (token !== null && !req.body.verify))
    ) {
      throw new HttpError(401, 'Unauthorized');
    } else if (req.body.user.email === user?.email || !req.body.verify) {
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
