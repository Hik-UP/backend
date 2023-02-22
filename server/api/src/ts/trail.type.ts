import { IComment } from './comment.type';

interface INewTrail {
  name: string;
  address: string;
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
  address: string;
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

interface ITrailWeather {
  temperature: number;
  icon: string;
}

export { INewTrail, ITrail, ITrailWeather };
