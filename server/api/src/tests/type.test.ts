/* istanbul ignore file */
import { ITrailComment } from '../ts/trail.type';

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
  comments: ITrailComment[];
}

interface ITrailCommentTest {
  id: string;
  author: {
    username: string;
    picture: string;
  };
  body: string;
  pictures: string[];
  date: Date;
}

interface IPOITest {
  id: string;
  name: string;
  description: string;
  pictures: string[];
  creator: { username: string; picture: string };
  sharedWith: { username: string; picture: string }[];
  trail: ITrailTest;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

interface IHikeTest {
  id: string;
  name: string;
  description: string;
  trail: ITrailTest;
  organizers: { username: string; picture: string }[];
  attendees: { username: string; picture: string }[];
  guests: { username: string; picture: string }[];
  schedule: Date;
  createdAt: Date;
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

export {
  ISkinTest,
  ITrailTest,
  ITrailCommentTest,
  IPOITest,
  IHikeTest,
  IUserTest
};
