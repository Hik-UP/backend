import { IComment } from './comment.type';

interface INewTrail {
  name: string;
  description: string;
  pictures: string[];
  latitude: number;
  longitude: number;
  difficulty: number;
  duration: number;
  distance: number;
  uphill: number;
  downhill: number;
  tools: string[];
  relatedArticles: string[];
  labels: string[];
  geoJSON: string;
}

interface ITrail {
  id: string;
  name: string;
  description: string;
  pictures: string[];
  latitude: number;
  longitude: number;
  difficulty: number;
  duration: number;
  distance: number;
  uphill: number;
  downhill: number;
  tools: string[];
  relatedArticles: string[];
  labels: string[];
  geoJSON: string;
  comments: IComment[];
}

interface ResultWeather {
  temp: number;
  url_icon: string;
}

export { INewTrail, ITrail, ResultWeather };
