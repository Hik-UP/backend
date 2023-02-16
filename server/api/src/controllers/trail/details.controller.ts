import { Request, Response } from 'express';
import { ResultWeather } from '../../ts/trail.type';
import { logger } from '../../utils/logger.util';
import {
  validateDetailsUser,
  validateDetailsTrails
} from '../../utils/validator';
import { HttpError } from '../../utils/error.util';
import { dbTrail } from '../../models/trail/trail.model';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_BASE_API_URL = process.env.WEATHER_BASE_API_URL;
const WEATHER_BASE_ICON_URL = process.env.WEATHER_BASE_ICON_URL;

async function recommendArticleUrl(id: string): Promise<string[] | undefined> {
  const { relatedArticles } = (await dbTrail.findOne(id)) || {};

  return relatedArticles;
}

async function getTools(id: string): Promise<string[] | undefined> {
  logger.info(id);
  const { tools } = (await dbTrail.findOne(id)) || {};

  return tools;
}

async function getWheater(
  lat: string,
  long: string
): Promise<ResultWeather | boolean> {
  const baseUrl = `${WEATHER_BASE_API_URL}?lat=${lat}&lon=${long}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const result = await fetch(baseUrl);
    const jsonData = await result.json();

    return {
      temp: Math.round(Number(jsonData['main']['temp'])),
      url_icon: `${WEATHER_BASE_ICON_URL}/${jsonData['weather'][0]['icon']}@2x.png`
    };
  } catch (e) {
    logger.error(e);
    return false;
  }
}

async function getCalories(
  weight: number,
  hoursActivity: number,
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

  logger.info(BMT);

  return hoursActivity * MET * BMT;
}

async function details(req: Request, res: Response) {
  try {
    const body = req.body;
    const { error } = validateDetailsUser(body['user']);
    if (error) return res.status(400).json({ error: error.details[0].message });
    if (body['user']['sex'] !== 'M' && body['user']['sex'] !== 'F')
      throw new HttpError(400, "Sex need to be M or F (in uppercase)'");
    const errorTrails = validateDetailsTrails(body['trail']);
    if (errorTrails.error)
      throw new HttpError(400, errorTrails.error.details[0].message);

    const weatherResult = await getWheater(
      body['trail']['latitude'],
      body['trail']['longitude']
    );
    const tools = await getTools(body['trail']['id']);
    const urls = await recommendArticleUrl(body['trail']['id']);
    const calories = await getCalories(
      Number(body['user']['weight']),
      Number(body['trail']['duration']),
      Number(body['user']['tall']),
      body['user']['sex'],
      Number(body['user']['age'])
    );

    if (typeof weatherResult === 'boolean') {
      throw '';
    }
    return res.status(200).json({
      weather: weatherResult,
      tools: tools,
      recommendArticleUrls: urls,
      calories
    });
  } catch (error) {
    if (error instanceof HttpError) {
      logger.warn('Details failed');
      res.status(error.statusCode).json({
        error: error.message
      });
    } else {
      logger.error('Details errors\n' + error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }
}

export default details;
