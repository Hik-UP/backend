import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../server/https';
import { mainTest } from '../../../../tests/main.test';
import { crypto } from '../../../../utils/cryptography.util';

const method = 'put';
const route = '/api/user/poi/update';
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
        poi: {
          id: randomUUID(),
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`
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
        poi: {
          id: randomUUID(),
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`
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
        poi: {
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`
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
        poi: {
          foo: 'bar',
          id: randomUUID(),
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`
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
        poi: {
          foo: 'bar',
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`
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
        poi: {
          id: randomUUID()
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
        poi: {
          description: `${crypto.randomString(20)}`
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
        poi: {}
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
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    await mainTest.req.setAdmin(user.email);

    const poi = await mainTest.req.createPOI();
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        poi: {
          id: poi.id,
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          sharedWith: {
            add: [{ email: user.email }]
          }
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    await mainTest.req.setAdmin(user.email);

    const poi = await mainTest.req.createPOI();
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        poi: {
          id: poi.id,
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          sharedWith: {
            remove: [{ email: user.email }]
          }
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 400', async () => {
    await mainTest.req.setAdmin(user.email);

    const otherUser = await mainTest.req.createUser();
    const poi = await mainTest.req.createPOI([{ email: otherUser.email }]);
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        poi: {
          id: poi.id,
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          sharedWith: {
            add: [{ email: otherUser.email }]
          }
        }
      });

    mainTest.verify.badRequest(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    const otherUser = await mainTest.req.createUser();
    const poi = await mainTest.req.createPOI();
    let res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        poi: {
          id: poi.id,
          sharedWith: {
            add: [{ email: otherUser.email }]
          }
        }
      });
    mainTest.verify.updated(res);

    res = await request(httpsServer)
      .post('/api/user/poi/retrieve')
      .set('Authorization', `Bearer ${otherUser.token}`)
      .send({
        user: {
          id: otherUser.id,
          roles: otherUser.roles
        },
        poi: {
          target: ['created', 'shared']
        }
      });
    poi.sharedWith = [
      {
        username: otherUser.username,
        picture: otherUser.picture
      }
    ];
    expect(res.body.poi.shared).toContainEqual(poi);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    const otherUser = await mainTest.req.createUser();
    const poi = await mainTest.req.createPOI([{ email: otherUser.email }]);
    let res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        poi: {
          id: poi.id,
          sharedWith: {
            remove: [{ email: otherUser.email }]
          }
        }
      });
    mainTest.verify.updated(res);

    res = await request(httpsServer)
      .post('/api/user/poi/retrieve')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        poi: {
          target: ['created', 'shared']
        }
      });
    expect(res.body.poi.created[0].creator).toEqual({
      username: user.username,
      picture: user.picture
    });
    expect(res.body.poi.created[0].sharedWith.length).toEqual(0);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 200', async () => {
    const otherUser = await mainTest.req.createUser();
    const poi = await mainTest.req.createPOI();
    const otherPOIDetails = {
      name: `${crypto.randomString(20)}`,
      description: `${crypto.randomString(20)}`,
      pictures: ['https://xxxxxxxxxxxxxx.xxx']
    };
    let res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        poi: {
          id: poi.id,
          name: otherPOIDetails.name,
          description: otherPOIDetails.description,
          pictures: otherPOIDetails.pictures,
          sharedWith: { add: [{ email: otherUser.email }] }
        }
      });

    mainTest.verify.updated(res);
    poi.name = otherPOIDetails.name;
    poi.description = otherPOIDetails.description;
    poi.pictures = otherPOIDetails.pictures;
    poi.sharedWith = [
      { username: otherUser.username, picture: otherUser.picture }
    ];

    res = await request(httpsServer)
      .post('/api/user/poi/retrieve')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        poi: {
          target: ['created', 'shared']
        }
      });
    expect(res.body.poi.created).toContainEqual(poi);
  });
});
