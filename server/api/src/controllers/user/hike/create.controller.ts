import { Request, Response } from 'express';

import { dbUser } from '../../../models/user/user.model';
import { notification } from '../../../utils/notification.util';
import { logger } from '../../../utils/logger.util';
import { HttpError } from '../../../utils/error.util';
import { dbTrail } from '../../../models/trail/trail.model';

async function generateCoins(
  trailId: string
): Promise<{ latitude: number; longitude: number }[]> {
  const trailGeoJSON = JSON.parse(
    (await dbTrail.findOne(trailId))?.geoJSON || ''
  );
  const hikeCoins: { latitude: number; longitude: number }[] = [];
  const coinsNumber = Math.floor(Math.random() * (trailGeoJSON.features[0].geometry.coordinates.length - 6) + 6);
  const coinsPosition: number[] = [];

  for (var i = 0; i < coinsNumber; i += 1) {
    const position = Math.floor(Math.random() * (trailGeoJSON.features[0].geometry.coordinates.length - 1) + 1);

    coinsPosition.indexOf(position) === -1 ? coinsPosition.push(position) : null;
  }
  for (var i = 0; i < coinsPosition.length; i += 1) {
    const coordinate: number[] =
      trailGeoJSON.features[0].geometry.coordinates[coinsPosition[i]];

    hikeCoins.indexOf({ latitude: coordinate[1], longitude: coordinate[0] }) === -1 ? hikeCoins.push({ latitude: coordinate[1], longitude: coordinate[0] }) : null;
  }

  return hikeCoins;
}

async function create(req: Request, res: Response): Promise<void> {
  try {
    const { email: userEmail } = (await dbUser.findOne(req.body.user.id)) || {};
    const hikeCoins = await generateCoins(req.body.trail.id);

    req.body.hike.guests?.forEach((value: { email: string }) => {
      if (value.email === userEmail) {
        throw new HttpError(400, 'Bad Request');
      }
    });
    await notification.send({
      receiversEmail: req.body.hike.guests?.map(
        (value: { email: string }) => value.email
      ),
      title: 'Hike invitation',
      body: "You've received an invitation to participate in a hike"
    });
    await dbUser.hike.create({
      name: req.body.hike.name,
      description: req.body.hike.description,
      coins: hikeCoins,
      organizerId: req.body.user.id,
      trailId: req.body.trail.id,
      guests: req.body.hike.guests,
      status: req.body.hike.schedule ? 'SCHEDULED' : undefined,
      schedule: req.body.hike.schedule
        ? new Date(req.body.hike.schedule * 1000)
        : undefined
    });

    logger.api.info('User hike creation succeed');
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.api.warn('User hike creation failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.api.error('User hike creation failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { create };
