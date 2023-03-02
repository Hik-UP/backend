import request from 'supertest';

import { httpsServer } from '../../server/https';
import { mainTest } from '../../tests/main.test';

const method = 'post';
const route = '/api/auth/login';

jest.setTimeout(60000);

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          foo: 'bar'
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 429', async () => {
    let res: any = undefined;

    for (let i = 0; i < 100; i += 1) {
      res = await request(httpsServer)
        [`${method}`](route)
        .send({
          user: {
            foo: 'bar'
          }
        });
    }
    mainTest.verify.tooManyRequests(res);
  });
});
