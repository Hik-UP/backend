import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../server/https';
import { mainTest } from '../../../tests/main.test';

const method = 'post';
const route = '/api/poi/create';
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
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 500', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      });

    mainTest.verify.internalServerError(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          latitude: `X${parseFloat(
            (Math.random() * (89 - -89) + -89).toFixed(12)
          )}X`,
          longitude: `${parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )}`
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          latitude: `${parseFloat(
            (Math.random() * (89 - -89) + -89).toFixed(12)
          )}`,
          longitude: `X${parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )}X`
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          latitude: 91,
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: 181
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          latitude: -91,
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: -181
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12))
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          id: randomUUID()
        },
        poi: {
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    await mainTest.req.setAdmin(user.email);

    for (let i = 0; i < 10; i += 1) {
      const trail = await mainTest.req.createTrail();
      const poi = {
        latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
        longitude: parseFloat((Math.random() * (179 - -179) + -179).toFixed(12))
      };
      let res = await request(httpsServer)
        [`${method}`](route)
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          },
          trail: {
            id: trail.id
          },
          poi: poi
        });

      mainTest.verify.created(res);

      res = await request(httpsServer)
        .post('/api/poi/retrieve')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          }
        });
      expect(res.body.poi.length).toEqual(i + 1);
      expect(res.body.poi).toContainEqual(poi);
    }
  });
});
