import request from 'supertest';

import { httpsServer } from '../../server/https';

afterAll(() => {
  httpsServer.close();
});

describe('POST /auth/signup', () => {
  it('should return 400', async () => {
    for (let iteration = 0; iteration < 100; iteration += 1) {
      const res = await request(httpsServer)
        .post('/api/auth/signup')
        .send({
          user: {
            foo: 'bar'
          }
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toMatchObject({ error: 'Bad Request' });
    }
  });
});

describe('POST /auth/signup', () => {
  it('should return 429', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          foo: 'bar'
        }
      });
    expect(res.statusCode).toEqual(429);
    expect(res.body).toMatchObject({ error: 'Too Many Requests' });
  });
});
