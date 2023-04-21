import request from 'supertest';

import { httpsServer } from '../../../../server/https';
import { mainTest } from '../../../../tests/main.test';

const method = 'post';
const route = '/api/user/notification/retrieve';
const user = mainTest.vars.defaultUser;

jest.setTimeout(60000);

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    const otherUser = await mainTest.req.createUser();

    await mainTest.req.setAdmin(user.email);

    for (let i = 0; i < 10; i += 1) {
      await mainTest.req.createHike([{ email: otherUser.email }]);

      const res = await request(httpsServer)
        .post('/api/user/notification/retrieve')
        .set('Authorization', `Bearer ${otherUser.token}`)
        .send({
          user: {
            id: otherUser.id,
            roles: otherUser.roles
          }
        });

      expect(res.body.notifications.length).toEqual(i + 1);
    }
  });
});
