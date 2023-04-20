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
  comments: ITrailComment[];
}

interface ITrailWeather {
  temperature: number;
  icon: string;
}

interface INewTrailComment {
  authorId: string;
  trailId: string;
  body: string;
  pictures: string[];
}

interface ITrailComment {
  id: string;
  author: {
    username: string;
    picture: string;
  };
  body: string;
  pictures: string[];
  date: Date;
}

interface IUpdateTrailComment {
  id: string;
  body: string;
  pictures: string[];
}

export {
  INewTrail,
  ITrail,
  ITrailWeather,
  INewTrailComment,
  ITrailComment,
  IUpdateTrailComment
};
