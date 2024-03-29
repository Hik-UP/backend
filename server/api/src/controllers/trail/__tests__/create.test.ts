import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { mainTest } from '../../../tests/main.test';
import { crypto } from '../../../utils/cryptography.util';
import { ITrailTest } from '../../../tests/type.test';

const method = 'post';
const route = '/api/trail/create';
const user = mainTest.vars.defaultUser;

jest.setTimeout(60000);

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      [`${method}`](route)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });

    mainTest.verify.unauthorized(res);
  });
});

describe(`${method.toUpperCase()} ${route}`, () => {
  it('should return 401', async () => {
    await mainTest.req.setAdmin(user.email);

    const res = await request(httpsServer)
      [`${method}`](route)
      .send({
        user: {
          id: user.id,
          roles: user.roles
        },
        trail: {
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
        }
      });

    mainTest.verify.unauthorized(res);
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
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`],
          geoJSON: `${crypto.randomString(20)}`
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
          name: `${crypto.randomString(20)}`,
          address: `${crypto.randomString(20)}`,
          description: `${crypto.randomString(20)}`,
          pictures: [`https://${crypto.randomString(20)}.com`],
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          difficulty: Math.floor(Math.random() * 10),
          duration: Math.floor(Math.random() * 10),
          distance: Math.floor(Math.random() * 10),
          uphill: Math.floor(Math.random() * 10),
          downhill: Math.floor(Math.random() * 10),
          tools: [`${crypto.randomString(20)}`],
          relatedArticles: [`https://${crypto.randomString(20)}.com`],
          labels: [`${crypto.randomString(20)}`]
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
        trail: {}
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
  it('should return 201', async () => {
    for (let i = 0; i < 10; i += 1) {
      const trail = {
        id: '',
        name: `${crypto.randomString(20)}`,
        address: `${crypto.randomString(20)}`,
        description: `${crypto.randomString(20)}`,
        pictures: [`https://${crypto.randomString(20)}.com`],
        latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
        longitude: parseFloat(
          (Math.random() * (179 - -179) + -179).toFixed(12)
        ),
        difficulty: Math.floor(Math.random() * 10),
        duration: Math.floor(Math.random() * 10),
        distance: Math.floor(Math.random() * 10),
        uphill: Math.floor(Math.random() * 10),
        downhill: Math.floor(Math.random() * 10),
        tools: [`${crypto.randomString(20)}`],
        relatedArticles: [`https://${crypto.randomString(20)}.com`],
        labels: [`${crypto.randomString(10)}`],
        geoJSON: `${crypto.randomString(20)}`,
        comments: []
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
            name: trail.name,
            address: trail.address,
            description: trail.description,
            pictures: trail.pictures,
            latitude: trail.latitude,
            longitude: trail.longitude,
            difficulty: trail.difficulty,
            duration: trail.duration,
            distance: trail.distance,
            uphill: trail.uphill,
            downhill: trail.downhill,
            tools: trail.tools,
            relatedArticles: trail.relatedArticles,
            labels: trail.labels,
            geoJSON: trail.geoJSON
          }
        });

      mainTest.verify.created(res);

      res = await request(httpsServer)
        .post('/api/trail/retrieve')
        .set('Authorization', `Bearer ${user.token}`)
        .send({
          user: {
            id: user.id,
            roles: user.roles
          }
        });
      const retrievedTrail: ITrailTest = res.body.trails.find(
        (value: ITrailTest) => value.name === trail.name
      );
      trail.id = retrievedTrail.id;
      expect(res.body.trails).toContainEqual(trail);
    }
  });
});
