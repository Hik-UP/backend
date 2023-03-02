import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { mainTest } from '../../../tests/main.test';
import { crypto } from '../../../utils/cryptography.util';

const method = 'post';
const route = '/api/auth/signup';
const user = mainTest.vars.defaultUser;

jest.setTimeout(60000);

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          username: user.username,
          email: user.email,
          password: user.password
        }
      });

    mainTest.verify.internalServerError(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          username: user.username,
          email: `test@${crypto.randomString(8)}.com`,
          password: crypto.randomString(64)
        }
      });

    mainTest.verify.internalServerError(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          username: crypto.randomString(20),
          email: user.email,
          password: crypto.randomString(64)
        }
      });

    mainTest.verify.internalServerError(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          email: `test@${crypto.randomString(8)}.com`,
          password: crypto.randomString(64)
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
          username: user.username,
          password: crypto.randomString(64)
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
          username: user.username,
          email: `test@${crypto.randomString(8)}.com`
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
          username: user.username
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
          email: `test@${crypto.randomString(8)}.com`
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
          password: crypto.randomString(64)
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
          foo: 'bar'
        }
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
          username: crypto.randomString(20),
          email: `test@${crypto.randomString(8)}.com`,
          password: crypto.randomString(64),
          foo: 'bar'
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          username: crypto.randomString(20),
          email: `test@${crypto.randomString(8)}.com`,
          password: user.password
        }
      });

    mainTest.verify.created(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    for (let i = 0; i < 10; i += 1) {
      const otherUser = {
        username: crypto.randomString(20),
        email: `test@${crypto.randomString(8)}.com`,
        password: crypto.randomString(64)
      };
      let res = await request(httpsServer)
        [`${method}`](route)
        .send({
          user: {
            username: otherUser.username,
            email: otherUser.email,
            password: otherUser.password
          }
        });

      mainTest.verify.created(res);

      res = await request(httpsServer)
        .post('/api/auth/login')
        .send({
          user: {
            email: otherUser.email,
            password: otherUser.password
          }
        });
      expect(res.statusCode).toEqual(200);
    }
  });
});
