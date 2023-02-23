import { IUserPublicProfile } from './user.type';
import { ITrail } from './trail.type';

interface INewHike {
  name: string;
  description: string;
  organizerId: string;
  trailId: string;
  guests?: [{ email: string }];
  schedule?: Date;
}

interface IHike {
  name: string;
  description: string;
  trail: ITrail;
  organizers: IUserPublicProfile[];
  attendees: IUserPublicProfile[];
  guests: IUserPublicProfile[];
  schedule: Date;
  createdAt: Date;
}

export { INewHike, IHike };
