import { ITrail } from './trail.type';
import { IUserPublicProfile } from './user.type';

interface INewPOI {
  name: string;
  description: string;
  pictures: string[];
  creatorId: string;
  sharedWith: [{ email: string }];
  trailId: string;
  latitude: number;
  longitude: number;
}

interface IPOI {
  id: string;
  name: string;
  description: string;
  pictures: string[];
  creator: IUserPublicProfile;
  sharedWith: IUserPublicProfile[];
  trail: ITrail;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export { INewPOI, IPOI };
