import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { mainTest } from '../../../tests/main.test';

const method = 'post';
const route = '/api/user/profile';
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
    for (let i = 0; i < 10; i += 1) {
      const otherUser = await mainTest.req.createUser();
      const res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          }
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.user).toMatchObject({
        username: otherUser.username,
        email: otherUser.email,
        picture: otherUser.picture
      });
    }
  });
});
