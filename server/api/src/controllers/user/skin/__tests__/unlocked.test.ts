import request from 'supertest';

import { httpsServer } from '../../../../server/https';
import { mainTest } from '../../../../tests/main.test';

const method = 'post';
const route = '/api/user/skin/unlocked';
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
    const defaultUserSkin = {
      ...mainTest.vars.defaultSkin,
      owners: [{ id: user.id, username: user.username }]
    };
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

    expect(res.body.skins.length).toEqual(1);
    expect(res.body.skins).toContainEqual(defaultUserSkin);
  });
});
