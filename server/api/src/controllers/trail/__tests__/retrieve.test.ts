import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { dbTest } from '../../../models/test/test.model';
import { crypto } from '../../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.removeAllTrails();
  await dbTest.createSkin();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.removeAllTrails();
});

const User = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  roles: [''],
  token: ''
};

describe('POST /auth/signup', () => {
  it('should return 201', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: User.username,
          email: User.email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /auth/login', () => {
  it('should return 200', async () => {
    await dbTest.setAdmin(User.email);
    const res = await request(httpsServer)
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
  });
});

describe('POST /trail/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/retrieve')
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /trail/retrieve', () => {
  it('should return 201', async () => {
    await dbTest.removeAllTrails();
    for (let i = 0; i < 25; i += 1) {
      const newTrail = {
        id: '',
        name: `${crypto.randomString(20)}`,
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
      expect(res.statusCode).toEqual(200);
      expect(res.body.trails.length).toEqual(i + 1);

      newTrail.id = res.body.trails[i].id;
      newTrail.comments = res.body.trails[i].comments;

      expect(typeof res.body.trails[i].name).toBe('string');
      expect(typeof res.body.trails[i].description).toBe('string');
      expect(typeof res.body.trails[i].pictures[0]).toBe('string');
      expect(typeof res.body.trails[i].latitude).toBe('number');
      expect(typeof res.body.trails[i].longitude).toBe('number');
      expect(typeof res.body.trails[i].difficulty).toBe('number');
      expect(typeof res.body.trails[i].duration).toBe('number');
      expect(typeof res.body.trails[i].distance).toBe('number');
      expect(typeof res.body.trails[i].uphill).toBe('number');
      expect(typeof res.body.trails[i].downhill).toBe('number');
      expect(typeof res.body.trails[i].tools[0]).toBe('string');
      expect(typeof res.body.trails[i].relatedArticles[0]).toBe('string');
      expect(typeof res.body.trails[i].labels[0]).toBe('string');
      expect(typeof res.body.trails[i].geoJSON).toBe('string');
      expect(res.body.trails).toContainEqual(newTrail);
    }
  });
});
