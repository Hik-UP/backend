import { Request, Response } from 'express';
import { dbSkin } from '../../models/skin/skin.model';
import { logger } from '../../utils/logger.util';

export async function unlock(req: Request, res: Response): Promise<void> {
  try {
    const currentSkin = await dbSkin.retrieveSkinWithId(req.body['skin']['id']);
    if (!currentSkin) {
      logger.api.info("A skin with this id don't found");
      res.status(404).json({ message: 'Not Found' });
    } else {
      await dbSkin.unlock(req.body.user.id, currentSkin?.id);
      logger.api.info('Skin unlock succeed');
      res.status(200).json({ message: 'Success' });
    }
  } catch (error) {
    logger.api.error('Skin unlock failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}
