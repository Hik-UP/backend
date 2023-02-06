import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { dbTest } from '../../../models/test.model';
import { crypto } from '../../../utils/cryptography.util';

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeUser(User.email);
});

const User = {
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64)
};

describe('POST /auth/signup', () => {
  it('should return 201', async () => {
    const res = await request(httpsServer).post('/api/auth/signup').send({
      user: User
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /auth/signup', () => {
  const email = `test@${crypto.randomString(8)}.com`;

  it('should return 201', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: crypto.randomString(20),
          email: email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
    await dbTest.removeUser(email);
  });
});

describe('POST /auth/signup', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer).post('/api/auth/signup').send({
      user: User
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /auth/signup', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: User.username,
          email: `test@${crypto.randomString(8)}.com`,
          password: crypto.randomString(64)
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /auth/signup', () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: crypto.randomString(20),
          email: User.email,
          password: crypto.randomString(64)
        }
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
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
    expect(typeof res.body.user.accessToken).toBe('string');
  });
});

describe('POST /auth/login', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: User.email,
          password: 'Wrong password !'
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /auth/login', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: 'wrong@email.test',
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});
