import request from 'supertest';

import { testHttpServer } from '../../../server/test';

const User = {
  userId: '',
  email: `test@${Math.random().toString(36).substr(2, 8)}.com`,
  password: Math.random().toString(36).substr(2, 64),
  accessToken: ''
};

const PointOfInterest = {
  latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
  longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12))
};

describe('POST /auth/signup', () => {
  it('should return 201', async () => {
    const res = await request(testHttpServer)
      .post('/api/auth/signup')
      .send({
        user: {
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
    const res = await request(testHttpServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: User.email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.user.id).toBe('string');
    expect(typeof res.body.accessToken).toBe('string');

    User.userId = res.body.user.id;
    User.accessToken = res.body.accessToken;
  });
});

describe('POST /poi/create', () => {
  it('should return 201', async () => {
    const res = await request(testHttpServer)
      .post('/api/poi/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId
        },
        poi: PointOfInterest
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /poi/create', () => {
  it('should return 500', async () => {
    const res = await request(testHttpServer)
      .post('/api/poi/create')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId
        },
        poi: {
          latitude: `${PointOfInterest.latitude}`,
          longitude: `${PointOfInterest.longitude}`
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 200', async () => {
    const res = await request(testHttpServer)
      .post('/api/poi/retrieve')
      .set('Authorization', `Bearer ${User.accessToken}`)
      .send({
        user: {
          id: User.userId
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.poi.length).toBeGreaterThanOrEqual(1);
    expect(typeof res.body.poi[0].latitude).toBe('number');
    expect(typeof res.body.poi[0].longitude).toBe('number');
    expect(res.body.poi).toContainEqual(PointOfInterest);
  });
});

describe('POST /poi/retrieve', () => {
  it('should return 401', async () => {
    const res = await request(testHttpServer)
      .post('/api/poi/retrieve')
      .send({
        user: {
          id: User.userId
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});
