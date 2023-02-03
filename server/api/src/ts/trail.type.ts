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
  labels: string[];
  geoJSON: string;
}

interface ITrail {
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
  labels: string[];
  geoJSON: string;
}

export { INewTrail, ITrail };
