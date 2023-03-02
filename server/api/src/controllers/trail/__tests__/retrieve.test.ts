import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { mainTest } from '../../../tests/main.test';

const method = 'post';
const route = '/api/trail/retrieve';
const user = mainTest.vars.defaultUser;

jest.setTimeout(60000);

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    await mainTest.req.setAdmin(user.email);

    for (let i = 0; i < 10; i += 1) {
      await mainTest.req.createTrail();

      const res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          }
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.trails.length).toEqual(i + 1);
    }
  });
});
