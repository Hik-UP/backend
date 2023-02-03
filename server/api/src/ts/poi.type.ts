interface INewPOI {
  creatorId: string;
  latitude: number;
  longitude: number;
}

interface IPOI {
  latitude: number;
  longitude: number;
}

export { INewPOI, IPOI };
