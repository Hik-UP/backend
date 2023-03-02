import request from 'supertest';

import { httpsServer } from '../../server/https';
import { mainTest } from '../../tests/main.test';

const method = 'post';
const route = '/api/auth/login';
const user = mainTest.vars.defaultUser;

jest.setTimeout(60000);

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          email: user.email
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          password: user.password
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)[`${method}`](route).send({
      foo: 'bar'
    });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)[`${method}`](route).send({
      user: {}
    });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)[`${method}`](route).send({});

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          email: user.email,
          password: user.password,
          foo: 'bar'
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          email: user.email,
          password: user.password
        }
      });

    expect(res.statusCode).toEqual(200);
  });
});
