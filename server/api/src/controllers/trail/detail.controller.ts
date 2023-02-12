import { Request, Response } from 'express';
import { ResultWeather } from '../../ts/trail.type';
import { logger } from '../../utils/logger.util';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_BASE_API_URL = process.env.WEATHER_BASE_API_URL;
const WEATHER_BASE_ICON_URL = process.env.WEATHER_BASE_ICON_URL;

async function recommendArticleUrl(): Promise<string[]> {
  const urls = [
    'https://www.altituderando.com/Check-list-rando-montagne-ou-comment-ne-rien-oublier',
    'https://www.routard.com/dossier-pratique-sur-le-voyage/cid135415-10-accessoires-indispensables-pour-partir-en-randonnee.html',
    'https://www.evanela.com/check-list-materiel-randonne-plusieurs-jours/'
  ];

  return urls;
}

async function getTools(): Promise<string[]> {
  const tools = [
    'La Boussole',
    'Lampe frontale',
    'Alimentation à forte calorie',
    'L’eau supplémentaire (et purificateur)',
    'Vêtements chauds et isolants',
    'Couteau multifonctions',
    'Crème solaire et lunettes de soleil',
    'Couverture de survie et Trousse de premiers soins'
  ];

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

async function getCalories(weight: number, hoursActivity: number) {
  const MET = 5; //Metabolic equivalent, l'effort dépensé pendant l'activité
  console.log(weight);
  console.log(hoursActivity);

  return 0.037 * MET * hoursActivity;
}

async function details(req: Request, res: Response) {
  const body = req.body;
  const weatherResult = await getWheater(
    body['trail']['lat'],
    body['trail']['long']
  );
  const tools = await getTools();
  const urls = await recommendArticleUrl();
  const calories = getCalories(
    Number(body['trail']['weight']),
    Number(body['trail']['hoursActivity'])
  );

  if (typeof weatherResult === 'boolean') {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  return res.status(200).json({
    msg: 'Everyting woks fine',
    weather: weatherResult,
    tools: tools,
    recommendArticleUrls: urls,
    calories
  });
}

export default details;
