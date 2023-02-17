import { Request, Response } from 'express';

import { trailJOI } from '../../middlewares/validator/trail/trail.validator';
import { ITrailWeather } from '../../ts/trail.type';
import { HttpError } from '../../utils/error.util';
import { dbTrail } from '../../models/trail/trail.model';
import { logger } from '../../utils/logger.util';

async function getWheater(
  latitude: number,
  longitude: number
): Promise<ITrailWeather | boolean> {
  const baseUrl = `${process.env.WEATHER_BASE_API_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.WEATHER_API_KEY}`;

  try {
    const result = await fetch(baseUrl);
    const jsonData = await result.json();

    return {
      temperature: Math.round(Number(jsonData.main.temp)),
      icon: `${process.env.WEATHER_BASE_ICON_URL}/${jsonData.weather[0].icon}@2x.png`
    };
  } catch (e) {
    logger.error(e);
    return false;
  }
}

async function getCalories(
  weight: number,
  duration: number,
  tall: number,
  sex: string,
  age: number
) {
  //Formule de Mifflin-St Jeor
  const MET = 5; //Metabolic equivalent, l'effort dépensé pendant l'activité
  const BMT =
    sex === 'M'
      ? 10 * weight + 6.25 * tall - 5 * age + 5
      : 10 * weight + 6.25 * tall - 5 * age - 161;

  return duration * MET * BMT;
}

async function details(req: Request, res: Response): Promise<void> {
  try {
    if (req.body.user.sex !== 'M' && req.body.user.sex !== 'F') {
      throw new HttpError(400, 'Bad Request');
    }

    const Trail = await dbTrail.findOne(req.body.trail.id);
    if (!Trail) {
      throw '';
    }
    const weatherResult = await getWheater(Trail.latitude, Trail.longitude);

    const calories = await getCalories(
      Number(req.body.user.weight),
      Number(Trail.duration),
      Number(req.body.user.tall),
      req.body.user.sex,
      Number(req.body.user.age)
    );

    if (typeof weatherResult === 'boolean') {
      throw '';
    }
    logger.info('Trail details recovery succeed');
    res.status(200).json({
      weather: weatherResult,
      tools: Trail.tools,
      relatedArticles: Trail.relatedArticles,
      calories
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('Trail details recovery failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('Trail details recovery failed\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export { details };
