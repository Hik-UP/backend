import { mainTest } from '../../../../tests/main.test';

const event = 'hike:hiker:join';
const user = mainTest.vars.defaultUser;

jest.setTimeout(10000);

beforeEach(() => {
  mainTest.socket.defaultSocket?.removeAllListeners();
  mainTest.socket.defaultSocket?.disconnect().connect();
});

describe(`${event}`, () => {
  it('should not join', async () => {
    await mainTest.req.setAdmin(user.email);

    const hike = await mainTest.req.createHike();
    const data = {
      data: {
        hike: { id: hike.id },
        hiker: {
          latitude: 'foo',
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      }
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    mainTest.socket.verify.internalServerError(res);
  });
});

describe(`${event}`, () => {
  it('should not join', async () => {
    const hike = await mainTest.req.createHike();
    const data = {
      data: {
        hike: { id: hike.id },
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: 'foo'
        }
      }
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    mainTest.socket.verify.internalServerError(res);
  });
});

describe(`${event}`, () => {
  it('should not join', async () => {
    const hike = await mainTest.req.createHike();
    const data = {
      data: {
        hike: { id: hike.id },
        hiker: {
          latitude: 'foo',
          longitude: 'bar'
        }
      }
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    mainTest.socket.verify.internalServerError(res);
  });
});

describe(`${event}`, () => {
  it('should join', async () => {
    const hike = await mainTest.req.createHike();
    const data = {
      data: {
        hike: { id: hike.id, foo: 'bar' },
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      }
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    mainTest.socket.verify.internalServerError(res);
  });
});

describe(`${event}`, () => {
  it('should join', async () => {
    const hike = await mainTest.req.createHike();
    const data = {
      data: {
        hike: { id: hike.id },
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          foo: 'bar'
        }
      }
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    mainTest.socket.verify.internalServerError(res);
  });
});

describe(`${event}`, () => {
  it('should join', async () => {
    const data = {
      data: {
        hike: {},
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      }
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    mainTest.socket.verify.internalServerError(res);
  });
});

describe(`${event}`, () => {
  it('should join', async () => {
    const data = {
      data: {
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      }
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    mainTest.socket.verify.internalServerError(res);
  });
});

describe(`${event}`, () => {
  it('should not join', async () => {
    const hike = await mainTest.req.createHike();
    const data = {
      data: {
        hike: { id: hike.id },
        hiker: {}
      }
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    mainTest.socket.verify.internalServerError(res);
  });
});

describe(`${event}`, () => {
  it('should not join', async () => {
    const hike = await mainTest.req.createHike();
    const data = {
      data: {
        hike: { id: hike.id }
      }
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    mainTest.socket.verify.internalServerError(res);
  });
});

describe(`${event}`, () => {
  it('should join', async () => {
    const hike = await mainTest.req.createHike();
    const data = {
      data: {
        hike: { id: hike.id },
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          )
        }
      }
    };
    const expected = {
      stats: { steps: 0, distance: 0, completed: false },
      hikers: []
    };
    const res = JSON.parse(
      await mainTest.socket.defaultSocket?.emitWithAck(event, data)
    );

    expect(res).toEqual(expected);
  });
});
