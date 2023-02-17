import request from 'supertest';

import { httpsServer } from '../../server/https';
import { dbTest } from '../../models/test/test.model';
import { crypto } from '../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.createSkin();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
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

describe('POST /auth/login', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: User.email
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('POST /auth/login', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('POST /auth/login', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer).post('/api/auth/login').send({
      foo: 'bar'
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});

describe('POST /auth/login', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: User.email,
          password: User.password,
          foo: 'bar'
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ error: 'Bad Request' });
  });
});
