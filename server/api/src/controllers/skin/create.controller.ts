import { Request, Response } from 'express';

import { dbSkin } from '../../models/skin/skin.model';
import { logger } from '../../utils/logger.util';

async function create(req: Request, res: Response): Promise<void> {
  try {
    await dbSkin.create({
      name: req.body.skin.name,
      description: req.body.skin.description,
      pictures: req.body.skin.pictures,
      model: req.body.skin.model,
      price: req.body.skin.price
    });
    logger.api.info('Skin creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    logger.api.error('Skin creation failed\n' + error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export { create };
