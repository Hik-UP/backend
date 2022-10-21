import request from 'supertest';

import { testHttpServer } from '../../server/test';

const User = {
  email: `test@${Math.random().toString(36).substr(2, 8)}.com`,
  password: Math.random().toString(36).substr(2, 64)
};

describe('POST /signup', () => {
  it('should return 201', async () => {
    const res = await request(testHttpServer).post('/api/auth/signup').send({
      email: User.email,
      password: User.password
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /signup', () => {
  it('should return 500', async () => {
    const res = await request(testHttpServer).post('/api/auth/signup').send({
      email: User.email,
      password: User.password
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toMatchObject({ error: 'Internal Server Error' });
  });
});

describe('POST /login', () => {
  it('should return 200', async () => {
    const res = await request(testHttpServer).post('/api/auth/login').send({
      email: User.email,
      password: User.password
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe('POST /login', () => {
  it('should return 401', async () => {
    const res = await request(testHttpServer).post('/api/auth/login').send({
      email: User.email,
      password: 'Wrong password !'
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /login', () => {
  it('should return 401', async () => {
    const res = await request(testHttpServer).post('/api/auth/login').send({
      email: 'wrong@email.test',
      password: User.password
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});
