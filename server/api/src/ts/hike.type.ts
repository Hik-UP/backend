interface INewHike {
  name: string;
  description: string;
  picture: string[];
  latitude: number;
  longitude: number;
  difficulty: number;
  duration: number;
  distance: number;
  uphill: number;
  downhill: number;
  label: string[];
}

interface IHike {
  name: string;
  description: string;
  picture: string[];
  latitude: number;
  longitude: number;
  difficulty: number;
  duration: number;
  distance: number;
  uphill: number;
  downhill: number;
  label: string[];
}

export { INewHike, IHike };
