interface INewPOI {
  creatorId: string;
  trailId: string;
  latitude: number;
  longitude: number;
}

interface IPOI {
  latitude: number;
  longitude: number;
}

export { INewPOI, IPOI };
