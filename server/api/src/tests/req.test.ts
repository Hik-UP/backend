/* istanbul ignore file */
import request from 'supertest';

import { httpsServer } from '../server/https';
import {
  IHikeTest,
  IPOITest,
  ISkinTest,
  ITrailCommentTest,
  ITrailTest,
  IUserTest
} from './type.test';
import { vars } from './vars.test';
import { db } from './db.test';
import { crypto } from '../utils/cryptography.util';

async function createDefaultUser(): Promise<void> {
  let res = await request(httpsServer)
    .post('/api/auth/signup')
    .send({
      user: {
        username: vars.defaultUser.username,
        email: vars.defaultUser.email,
        password: vars.defaultUser.password
      }
    });

  res = await request(httpsServer)
    .post('/api/auth/login')
    .send({
      user: {
        email: vars.defaultUser.email,
        password: vars.defaultUser.password
      }
    });
  vars.defaultUser.id = res.body.user.id;
  vars.defaultUser.roles = res.body.user.roles;
  vars.defaultUser.token = res.body.user.token;

  await request(httpsServer)
    .put('/api/user/profile/update')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles,
        picture: vars.defaultUser.picture,
        fcmToken: vars.defaultUser.fcmToken
      }
    });
}

async function createSkin(): Promise<ISkinTest> {
  const skin = {
    id: '',
    name: crypto.randomString(20),
    description: crypto.randomString(20),
    pictures: [`https://${crypto.randomString(20)}.com`],
    model: `https://${crypto.randomString(20)}.com`
  };
  let res = await request(httpsServer)
    .post('/api/skin/create')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      skin: {
        name: skin.name,
        description: skin.description,
        pictures: skin.pictures,
        model: skin.model
      }
    });

  res = await request(httpsServer)
    .post('/api/skin/retrieve')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      }
    });
  const retrievedSkin: ISkinTest = res.body.skins.find(
    (value: ISkinTest) => value.name === skin.name
  );
  skin.id = retrievedSkin.id;

  return skin;
}

async function createTrail(): Promise<ITrailTest> {
  const trail = {
    id: '',
    name: `${crypto.randomString(20)}`,
    address: `${crypto.randomString(20)}`,
    description: `${crypto.randomString(20)}`,
    pictures: [`https://${crypto.randomString(20)}.com`],
    latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
    longitude: parseFloat((Math.random() * (179 - -179) + -179).toFixed(12)),
    difficulty: Math.floor(Math.random() * 10),
    duration: Math.floor(Math.random() * 10),
    distance: Math.floor(Math.random() * 10),
    uphill: Math.floor(Math.random() * 10),
    downhill: Math.floor(Math.random() * 10),
    tools: [`${crypto.randomString(20)}`],
    relatedArticles: [`https://${crypto.randomString(20)}.com`],
    labels: [`${crypto.randomString(10)}`],
    geoJSON: `${crypto.randomString(20)}`,
    comments: []
  };
  let res = await request(httpsServer)
    .post('/api/trail/create')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      trail: {
        name: trail.name,
        address: trail.address,
        description: trail.description,
        pictures: trail.pictures,
        latitude: trail.latitude,
        longitude: trail.longitude,
        difficulty: trail.difficulty,
        duration: trail.duration,
        distance: trail.distance,
        uphill: trail.uphill,
        downhill: trail.downhill,
        tools: trail.tools,
        relatedArticles: trail.relatedArticles,
        labels: trail.labels,
        geoJSON: trail.geoJSON
      }
    });

  res = await request(httpsServer)
    .post('/api/trail/retrieve')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      }
    });
  const retrievedTrail: ITrailTest = res.body.trails.find(
    (value: ITrailTest) => value.name === trail.name
  );
  trail.id = retrievedTrail.id;

  return trail;
}

async function createTrailComment(): Promise<{
  trail: ITrailTest;
  comment: ITrailCommentTest;
}> {
  const trail = await createTrail();
  const comment = {
    id: '',
    author: {
      username: vars.defaultUser.username,
      picture: vars.defaultUser.picture
    },
    body: `${crypto.randomString(20)}`,
    pictures: [`https://${crypto.randomString(20)}.com`],
    date: new Date()
  };
  let res = await request(httpsServer)
    .post('/api/trail/comment/create')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      trail: {
        id: trail.id,
        comment: {
          body: comment.body,
          pictures: comment.pictures
        }
      }
    });

  res = await request(httpsServer)
    .post('/api/trail/retrieve')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      }
    });
  const retrievedTrail: ITrailTest = res.body.trails.find(
    (value: ITrailTest) => value.name === trail.name
  );
  comment.id = retrievedTrail.comments[0].id;
  comment.date = retrievedTrail.comments[0].date;

  return { trail: trail, comment: comment };
}

async function createPOI(sharedWith?: [{ email: string }]): Promise<IPOITest> {
  const trail = await createTrail();
  const poi = {
    id: '',
    name: `${crypto.randomString(20)}`,
    description: `${crypto.randomString(20)}`,
    pictures: [`https://${crypto.randomString(20)}.com`],
    creator: {
      username: vars.defaultUser.username,
      picture: vars.defaultUser.picture
    },
    sharedWith: [{ username: '', picture: '' }],
    trail: trail,
    latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
    longitude: parseFloat((Math.random() * (179 - -179) + -179).toFixed(12)),
    createdAt: new Date()
  };
  let res = await request(httpsServer)
    .post('/api/user/poi/create')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      trail: {
        id: trail.id
      },
      poi: {
        name: poi.name,
        description: poi.description,
        pictures: poi.pictures,
        sharedWith: sharedWith,
        latitude: poi.latitude,
        longitude: poi.longitude
      }
    });

  res = await request(httpsServer)
    .post('/api/user/poi/retrieve')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      poi: {
        target: ['created']
      }
    });
  const retrievedPOI: IPOITest = res.body.poi.created.find(
    (value: IPOITest) => value.name === poi.name
  );
  poi.id = retrievedPOI.id;
  poi.creator = retrievedPOI.creator;
  poi.sharedWith = retrievedPOI.sharedWith;
  poi.createdAt = retrievedPOI.createdAt;

  return poi;
}

async function createHike(guests?: [{ email: string }]): Promise<IHikeTest> {
  const trail = await createTrail();
  const hike = {
    id: '',
    name: `${crypto.randomString(20)}`,
    description: `${crypto.randomString(20)}`,
    trail: trail,
    organizers: [{ username: '', picture: '' }],
    attendees: [{ username: '', picture: '' }],
    guests: [{ username: '', picture: '' }],
    stats: [
      {
        completed: false,
        distance: 0,
        steps: 0,
        user: { username: '', picture: '' }
      }
    ],
    status: 'IN_PROGRESS',
    schedule: new Date(),
    createdAt: new Date()
  };
  let res = await request(httpsServer)
    .post('/api/user/hike/create')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      trail: {
        id: trail.id
      },
      hike: {
        name: hike.name,
        description: hike.description,
        guests: guests
      }
    });

  res = await request(httpsServer)
    .post('/api/user/hike/retrieve')
    .set('Authorization', `Bearer ${vars.defaultUser.token}`)
    .send({
      user: {
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles
      },
      hike: {
        target: ['organized', 'attendee', 'guest']
      }
    });
  const retrievedHike: IHikeTest = res.body.hikes.organized.find(
    (value: IHikeTest) => value.name === hike.name
  );
  hike.id = retrievedHike.id;
  hike.organizers = retrievedHike.organizers;
  hike.attendees = retrievedHike.attendees;
  hike.guests = retrievedHike.guests;
  hike.stats = retrievedHike.stats;
  hike.schedule = retrievedHike.schedule;
  hike.createdAt = retrievedHike.createdAt;

  return hike;
}

async function createUser(): Promise<IUserTest> {
  const user = {
    id: '',
    username: crypto.randomString(20),
    email: `test@${crypto.randomString(8)}.com`,
    password: crypto.randomString(64),
    picture: `https://${crypto.randomString(20)}.com`,
    fcmToken: crypto.randomString(64),
    sex: 'M',
    age: Math.floor(Math.random() * (100 - 20) + 20),
    tall: Math.floor(Math.random() * (200 - 90) + 90),
    weight: Math.floor(Math.random() * (200 - 60) + 60),
    roles: [''],
    token: ''
  };
  let res = await request(httpsServer)
    .post('/api/auth/signup')
    .send({
      user: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    });

  res = await request(httpsServer)
    .post('/api/auth/login')
    .send({
      user: {
        email: user.email,
        password: user.password
      }
    });
  user.id = res.body.user.id;
  user.roles = res.body.user.roles;
  user.token = res.body.user.token;

  await request(httpsServer)
    .put('/api/user/profile/update')
    .set('Authorization', `Bearer ${user.token}`)
    .send({
      user: {
        id: user.id,
        roles: user.roles,
        picture: user.picture,
        fcmToken: user.fcmToken
      }
    });

  return user;
}

async function setAdmin(email: string): Promise<void> {
  await db.setAdmin(email);

  const res = await request(httpsServer)
    .post('/api/auth/login')
    .send({
      user: {
        email: vars.defaultUser.email,
        password: vars.defaultUser.password
      }
    });

  vars.defaultUser.id = res.body.user.id;
  vars.defaultUser.roles = res.body.user.roles;
  vars.defaultUser.token = res.body.user.token;
}

const req = {
  createDefaultUser,
  createSkin,
  createTrail,
  createTrailComment,
  createPOI,
  createHike,
  createUser,
  setAdmin
};

export { req };
