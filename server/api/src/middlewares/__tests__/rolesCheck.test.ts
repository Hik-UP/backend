import request from 'supertest';

import { httpsServer } from '../../server/https';
import { dbTest } from '../../models/test/test.model';
import { crypto } from '../../utils/cryptography.util';

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
    expect(res.body.user.roles).toEqual(['USER']);
    expect(typeof res.body.user.token).toBe('string');

    User.userId = res.body.user.id;
    User.roles = res.body.user.roles;
    User.token = res.body.user.token;
  });
});

describe('POST /trail/create', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
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
          geoJSON: `${crypto.randomString(20)}`
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /trail/create', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId
        },
        trail: {
          foo: 'bar'
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
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

describe('POST /trail/create', () => {
  it('should return 201', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/create')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        },
        trail: {
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
          geoJSON: `${crypto.randomString(20)}`
        }
      });
    expect(res.statusCode).toEqual(201);
  });
});
