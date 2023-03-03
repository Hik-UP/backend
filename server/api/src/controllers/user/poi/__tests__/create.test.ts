import request from 'supertest';
import { randomUUID } from 'crypto';

import { httpsServer } from '../../../../server/https';
import { mainTest } from '../../../../tests/main.test';
import { crypto } from '../../../../utils/cryptography.util';
import { IPOITest } from '../../../../tests/type.test';

const method = 'post';
const route = '/api/user/poi/create';
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: `X${parseFloat(
            (Math.random() * (89 - -89) + -89).toFixed(12)
          )}X`,
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
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
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
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
          name: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
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
        trail: {},
        poi: {
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
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
        poi: {
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
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
    await mainTest.req.setAdmin(user.email);

    const trail = await mainTest.req.createTrail();
    const res = await request(httpsServer)
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
        poi: {
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          sharedWith: [{ email: user.email }],
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
    const trail = await mainTest.req.createTrail();
    const otherUser = await mainTest.req.createUser();
    const poi = {
      id: '',
      name: `${crypto.randomString(20)}`,
      description: `${crypto.randomString(20)}`,
      pictures: [`https://${crypto.randomString(20)}.com`],
      creator: { username: user.username, picture: user.picture },
      sharedWith: [
        { username: otherUser.username, picture: otherUser.picture }
      ],
      trail: trail,
      latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
      longitude: parseFloat((Math.random() * (179 - -179) + -179).toFixed(12)),
      createdAt: new Date()
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
        poi: {
          name: poi.name,
          description: poi.description,
          pictures: poi.pictures,
          sharedWith: [{ email: otherUser.email }],
          latitude: poi.latitude,
          longitude: poi.longitude
        }
      });

    mainTest.verify.created(res);

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
    poi.id = res.body.poi.shared[0].id;
    poi.createdAt = res.body.poi.shared[0].createdAt;
    expect(res.body.poi.created.length).toEqual(0);
    expect(res.body.poi.shared.length).toEqual(1);
    expect(res.body.poi.shared).toContainEqual(poi);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 201', async () => {
    await mainTest.db.removeAllPOI();

    for (let i = 0; i < 10; i += 1) {
      const trail = await mainTest.req.createTrail();
      const poi = {
        id: '',
        name: `${crypto.randomString(20)}`,
        description: `${crypto.randomString(20)}`,
        pictures: [`https://${crypto.randomString(20)}.com`],
        creator: { username: user.username, picture: user.picture },
        sharedWith: [],
        trail: trail,
        latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
        longitude: parseFloat(
          (Math.random() * (179 - -179) + -179).toFixed(12)
        ),
        createdAt: new Date()
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
          poi: {
            name: poi.name,
            description: poi.description,
            pictures: poi.pictures,
            sharedWith: poi.sharedWith,
            latitude: poi.latitude,
            longitude: poi.longitude
          }
        });

      mainTest.verify.created(res);

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
      const retrievedPOI: IPOITest = res.body.poi.created.find(
        (value: IPOITest) => value.name === poi.name
      );
      poi.id = retrievedPOI.id;
      poi.createdAt = retrievedPOI.createdAt;
      expect(res.body.poi.created.length).toEqual(i + 1);
      expect(res.body.poi.shared.length).toEqual(0);
      expect(res.body.poi.created).toContainEqual(poi);
    }
  });
});
