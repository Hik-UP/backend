import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { mainTest } from '../../../tests/main.test';

const method = 'post';
const route = '/api/skin/retrieve';
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
  it('should return 200', async () => {
    await mainTest.req.setAdmin(user.email);

    for (let i = 0; i < 10; i += 1) {
      await mainTest.req.createSkin();

      const res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          }
        });

      mainTest.verify.ok(res);
      expect(res.body.skins.length).toEqual(i + 2);
    }
  });
});
