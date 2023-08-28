import { IUserPublicProfile } from './user.type';
import { ITrail } from './trail.type';

interface INewHike {
  name: string;
  description: string;
  organizerId: string;
  trailId: string;
  guests?: [{ email: string }];
  status?: 'SCHEDULED' | 'IN_PROGRESS' | 'DONE';
  schedule?: Date;
}

interface IHike {
  id: string;
  name: string;
  description: string;
  trail: ITrail;
  organizers: IUserPublicProfile[];
  attendees: IUserPublicProfile[];
  guests: IUserPublicProfile[];
  stats: IHikeStats[];
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'DONE';
  schedule: Date;
  createdAt: Date;
}

interface IUpdateHike {
  id: string;
  name?: string;
  description?: string;
  trailId?: string;
  attendees?: { remove?: [{ email: string }] };
  guests?: { add?: [{ email: string }]; remove?: [{ email: string }] };
  status?: 'SCHEDULED' | 'IN_PROGRESS' | 'DONE';
  schedule?: Date;
}

interface IHikeStats {
  user: IUserPublicProfile;
  steps: number;
  distance: number;
  completed: boolean;
}

export { INewHike, IHike, IUpdateHike };
