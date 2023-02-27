import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../server/https';
import { dbTest } from '../../../../models/test/test.model';
import { crypto } from '../../../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllHikes();
  await dbTest.removeAllTrails();
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.createSkin();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllHikes();
  await dbTest.removeAllTrails();
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
});

const User = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  roles: [''],
  token: ''
};

const OtherUser = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  roles: [''],
  token: ''
};

describe('POST /auth/signup', () => {
  it('should return 201', async () => {
    let res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: User.username,
          email: User.email,
          password: User.password
        }
      });
    res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: OtherUser.username,
          email: OtherUser.email,
          password: OtherUser.password
        }
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /auth/login', () => {
  it('should return 200', async () => {
    await dbTest.setAdmin(User.email);
    let res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: User.email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.user.id).toBe('string');
    expect(res.body.user.roles).toEqual(['ADMIN']);
    expect(typeof res.body.user.token).toBe('string');

    User.userId = res.body.user.id;
    User.roles = res.body.user.roles;
    User.token = res.body.user.token;

    res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: OtherUser.email,
          password: OtherUser.password
        }
      });

    OtherUser.userId = res.body.user.id;
    OtherUser.roles = res.body.user.roles;
    OtherUser.token = res.body.user.token;
  });
});

describe('PUT /user/hike/refuse', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .put('/api/user/hike/refuse')
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        hike: {
          id: randomUUID()
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('PUT /user/hike/refuse', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .put('/api/user/hike/refuse')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        hike: {
          id: randomUUID()
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('PUT /user/hike/refuse', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .put('/api/user/hike/refuse')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        hike: {}
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('PUT /user/hike/refuse', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .put('/api/user/hike/refuse')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        hike: {
          foo: 'bar'
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('PUT /user/hike/refuse', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .put('/api/user/hike/refuse')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('PUT /user/hike/refuse', () => {
  jest.setTimeout(60000);
  it('should return 201', async () => {
    await dbTest.removeAllHikes();
    await dbTest.removeAllTrails();
    for (let i = 0; i < 5; i += 1) {
      const newTrail = {
        id: '',
        name: `${crypto.randomString(20)}`,
        address: `${crypto.randomString(20)}`,
        description: `${crypto.randomString(20)}`,
        pictures: [`https://${crypto.randomString(20)}.com`],
        latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
        longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12)),
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
      const newHike = {
        id: '',
        name: `${crypto.randomString(20)}`,
        description: `${crypto.randomString(20)}`,
        trail: newTrail,
        organizers: [{ username: User.username, picture: '' }],
        attendees: [{ username: User.username, picture: '' }],
        guests: [{}],
        schedule: '',
        createdAt: ''
      };
      let res = await request(httpsServer)
        .post('/api/trail/create')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          },
          trail: {
            name: newTrail.name,
            address: newTrail.address,
            description: newTrail.description,
            pictures: newTrail.pictures,
            latitude: newTrail.latitude,
            longitude: newTrail.longitude,
            difficulty: newTrail.difficulty,
            duration: newTrail.duration,
            distance: newTrail.distance,
            uphill: newTrail.uphill,
            downhill: newTrail.downhill,
            tools: newTrail.tools,
            relatedArticles: newTrail.relatedArticles,
            labels: newTrail.labels,
            geoJSON: newTrail.geoJSON
          }
        });
      res = await request(httpsServer)
        .post('/api/trail/retrieve')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          }
        });

      newTrail.id = res.body.trails[i].id;
      newHike.trail.id = res.body.trails[i].id;

      res = await request(httpsServer)
        .post('/api/hike/create')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          },
          trail: {
            id: newTrail.id
          },
          hike: {
            name: newHike.name,
            description: newHike.description,
            guests: [{ email: OtherUser.email }]
          }
        });
      res = await request(httpsServer)
        .post('/api/hike/retrieve')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          },
          hike: {
            target: ['organized', 'attendee', 'guest']
          }
        });

      newHike.id = res.body.hikes.organized[i].id;
      newHike.schedule = res.body.hikes.organized[i].schedule;
      newHike.createdAt = res.body.hikes.organized[i].createdAt;
      newHike.guests = [{ username: OtherUser.username, picture: '' }];

      expect(res.body.hikes.organized.length).toEqual(i + 1);
      expect(res.body.hikes.attendee.length).toEqual(i + 1);
      expect(res.body.hikes.guest.length).toEqual(0);

      expect(res.body.hikes.organized).toContainEqual(newHike);

      res = await request(httpsServer)
        .post('/api/hike/retrieve')
        .set('Authorization', `Bearer ${OtherUser.token}`)
        .send({
          user: {
            id: OtherUser.userId,
            roles: OtherUser.roles
          },
          hike: {
            target: ['organized', 'attendee', 'guest']
          }
        });

      expect(res.body.hikes.organized.length).toEqual(0);
      expect(res.body.hikes.attendee.length).toEqual(0);
      expect(res.body.hikes.guest.length).toEqual(1);

      expect(res.body.hikes.guest).toContainEqual(newHike);

      res = await request(httpsServer)
        .put('/api/user/hike/refuse')
        .set('Authorization', `Bearer ${OtherUser.token}`)
        .send({
          user: {
            id: OtherUser.userId,
            roles: OtherUser.roles
          },
          hike: {
            id: newHike.id
          }
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject({ message: 'Updated' });

      res = await request(httpsServer)
        .post('/api/hike/retrieve')
        .set('Authorization', `Bearer ${OtherUser.token}`)
        .send({
          user: {
            id: OtherUser.userId,
            roles: OtherUser.roles
          },
          hike: {
            target: ['organized', 'attendee', 'guest']
          }
        });

      expect(res.body.hikes.organized.length).toEqual(0);
      expect(res.body.hikes.attendee.length).toEqual(0);
      expect(res.body.hikes.guest.length).toEqual(0);
    }
  });
});
