import request from 'supertest';

import { httpsServer } from '../../../server/https';
import { dbTest } from '../../../models/test/test.model';
import { crypto } from '../../../utils/cryptography.util';

beforeAll(async () => {
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.removeAllTrails();
  await dbTest.createSkin();
});

afterAll(async () => {
  httpsServer.close();
  await dbTest.removeAllUsers();
  await dbTest.removeAllSkins();
  await dbTest.removeAllTrails();
});

const User = {
  userId: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  roles: [''],
  token: '',
  weight: 0,
  tall: 0,
  sex: '',
  age: 0
};

const Trail = {
  id: '',
  name: `${crypto.randomString(20)}`,
  description: `${crypto.randomString(20)}`,
  pictures: [`${crypto.randomString(20)}`],
  latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
  longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12)),
  difficulty: 0,
  duration: 0,
  distance: 0,
  uphill: 0,
  downhill: 0,
  tools: [],
  relatedArticles: [],
  labels: [`${crypto.randomString(20)}`],
  geoJSON: `${crypto.randomString(20)}`,
  comments: []
};

describe('POST /auth/signup', () => {
  it('should return 201', async () => {
    const res = await request(httpsServer)
      .post('/api/auth/signup')
      .send({
        user: {
          username: User.username,
          email: User.email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({ message: 'Created' });
  });
});

describe('POST /auth/login', () => {
  it('should return 200', async () => {
    await dbTest.setAdmin(User.email);
    const res = await request(httpsServer)
      .post('/api/auth/login')
      .send({
        user: {
          email: User.email,
          password: User.password
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.user.id).toBe('string');
    expect(res.body.user.roles).toEqual(['ADMIN']);
    expect(typeof res.body.user.token).toBe('string');

    User.userId = res.body.user.id;
    User.roles = res.body.user.roles;
    User.token = res.body.user.token;
  });
});

describe('POST /trail/details', () => {
  it('should return 401', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          age: User.age,
          weight: User.weight,
          tall: User.tall,
          sex: User.sex
        },
        trail: {
          id: '0',
          latitude: 4,
          longitude: 4,
          duration: 4
        }
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ error: 'Unauthorized' });
  });
});

describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains only weight of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          weight: User.weight
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains only tall of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains only sex of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          sex: User.tall
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains only age of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          age: User.age
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains weight, tall, sex without age of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          weight: User.weight,
          tall: User.tall,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains weight, tall without age and sex of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          weight: User.weight,
          tall: User.tall
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains age, sex without weigth and tall of user
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          age: User.age,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains age, sex, tall without weight
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          age: User.age,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains age, sex, weight without tall
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user without trail property
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user , and only id in trail object
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          id: Trail.id
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user , and only latitude in trail object
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          latitude: Trail.latitude
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user , and only longitude in trail object
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          longitude: Trail.longitude
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user , and only duration in trail object
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          duration: Trail.duration
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user , and only id and latitude in trail object
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          id: Trail.id,
          latitude: Trail.latitude
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user , and only id, latitude, longitude in trail object
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          id: Trail.id,
          latitude: Trail.latitude,
          longitude: Trail.longitude
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user , and only id, longitude in trail object
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          id: Trail.id,
          longitude: Trail.longitude
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user , and only id, duration in trail object
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: User.sex
        },
        trail: {
          id: Trail.id,
          duration: Trail.duration
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

//When body contains user, and trail object but sex not equal to F or M
describe('POST /trail/details', () => {
  it('should return 400', async () => {
    const res = await request(httpsServer)
      .post('/api/trail/details')
      .set('Authorization', `Bearer ${User.token}`)
      .send({
        user: {
          id: User.userId,
          roles: User.roles,
          tall: User.tall,
          weight: User.weight,
          age: User.age,
          sex: 'P'
        },
        trail: {
          id: Trail.id,
          duration: Trail.duration
        }
      });
    expect(res.statusCode).toEqual(400);
    expect(typeof res.body.error).toBe('string');
  });
});

function generateRandomLetter() {
  const alphabet = 'MF';

  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

describe('POST /trail/details', () => {
  jest.setTimeout(60000);
  it('should return 201', async () => {
    await dbTest.removeAllTrails();
    for (let i = 0; i < 25; i += 1) {
      const newUserDetails = {
        sex: generateRandomLetter(),
        weight: Math.floor(Math.random() * 10),
        tall: Math.floor(Math.random() * 10),
        age: Math.floor(Math.random() * 10)
      };
      const newTrail = {
        id: '',
        name: `${crypto.randomString(20)}`,
        description: `${crypto.randomString(20)}`,
        pictures: [`${crypto.randomString(20)}`],
        latitude: parseFloat((Math.random() * (90 - 0) + 0).toFixed(12)),
        longitude: parseFloat((Math.random() * (180 - 0) + 0).toFixed(12)),
        difficulty: Math.floor(Math.random() * 10),
        duration: Math.floor(Math.random() * 10),
        distance: Math.floor(Math.random() * 10),
        uphill: Math.floor(Math.random() * 10),
        downhill: Math.floor(Math.random() * 10),
        tools: [`${crypto.randomString(20)}`],
        relatedArticles: [`${crypto.randomString(20)}`],
        labels: [`${crypto.randomString(20)}`],
        geoJSON: `${crypto.randomString(20)}`,
        comments: []
      };
      let res = await request(httpsServer)
        .post('/api/trail/create')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          },
          trail: newTrail
        });

      res = await request(httpsServer)
        .post('/api/trail/retrieve')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles
          }
        });
      newTrail.id = res.body.trails[i].id;
      newTrail.comments = res.body.trails[i].comments;

      res = await request(httpsServer)
        .post('/api/trail/details')
        .set('Authorization', `Bearer ${User.token}`)
        .send({
          user: {
            id: User.userId,
            roles: User.roles,
            weight: newUserDetails.weight,
            tall: newUserDetails.tall,
            sex: newUserDetails.sex,
            age: newUserDetails.age
          },
          trail: {
            id: newTrail.id,
            latitude: newTrail.latitude,
            longitude: newTrail.longitude,
            duration: newTrail.duration
          }
        });

      const BMT =
        newUserDetails.sex === 'M'
          ? 10 * newUserDetails.weight +
            6.25 * newUserDetails.tall -
            5 * newUserDetails.age +
            5
          : 10 * newUserDetails.weight +
            6.25 * newUserDetails.tall -
            5 * newUserDetails.age -
            161;

      const calories = 5 * BMT * newTrail.duration;

      expect(res.statusCode).toEqual(200);
      expect(typeof res.body.weather.temp).toBe('number');
      expect(typeof res.body.weather.url_icon).toBe('string');
      expect(typeof res.body.calories).toBe('number');
      expect(res.body.calories === calories).toBeTruthy();
    }
  });
});
