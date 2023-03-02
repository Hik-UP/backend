/* istanbul ignore file */
import { IComment } from '../ts/comment.type';

interface ISkinTest {
  id: string;
  name: string;
  description: string;
  pictures: string[];
  model: string;
}

interface ITrailTest {
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

interface IPOITest {
  latitude: number;
  longitude: number;
}

interface IHikeTest {
  id: string;
  name: string;
  description: string;
  trail: ITrailTest;
  organizers: { username: string; picture: string }[];
  attendees: { username: string; picture: string }[];
  guests: { username: string; picture: string }[];
  schedule: string;
  createdAt: string;
}

interface IUserTest {
  id: string;
  username: string;
  email: string;
  password: string;
  picture: string;
  sex: string;
  age: number;
  tall: number;
  weight: number;
  roles: string[];
  token: string;
}

export { ISkinTest, ITrailTest, IPOITest, IHikeTest, IUserTest };
