import { Request, Response } from 'express';
import { dbSkin } from '../../models/skin/skin.model';
import { logger } from '../../utils/logger.util';
import { dbUser } from '../../models/user/user.model';
import { ISkin } from '../../ts/skin.type';

export async function updateCurrentSkin(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const currentSkin = await dbSkin.retrieveSkinWithId(req.body['skin']['id']);
    if (!currentSkin) {
      logger.api.info("A skin with this id don't found");
      res.status(404).json({ message: 'Not Found' });
    }

    await dbUser.update(req.body.user.id, { skinId: currentSkin?.id });
    logger.api.info('Skin update succeed');
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    logger.api.error('Skin update failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}
