import { mainTest } from '../../../../tests/main.test';

const event = 'hike:hiker:move';
const user = mainTest.vars.defaultUser;

jest.setTimeout(10000);

beforeEach(() => {
  mainTest.socket.defaultSocket?.removeAllListeners();
  mainTest.socket.defaultSocket?.disconnect().connect();
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    const data = {
      data: {
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          stats: { steps: 0, distance: 0, completed: false }
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {
          latitude: 'foo',
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          stats: { steps: 0, distance: 0, completed: false }
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: 'foo',
          stats: { steps: 0, distance: 0, completed: false }
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          stats: { steps: 'foo', distance: 0, completed: false }
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          stats: { steps: 0, distance: 'foo', completed: false }
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          stats: { steps: 0, distance: 0, completed: 'foo' }
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          stats: { steps: 0, distance: 0, completed: false }
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          stats: { steps: 0, distance: 0, completed: false }
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
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

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          stats: {}
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {}
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should not move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {}
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});

describe(`${event}`, () => {
  it('should move', async () => {
    await mainTest.req.setAdmin(user.email);

    await mainTest.socket.req.joinHike();
    const data = {
      data: {
        hiker: {
          latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
          longitude: parseFloat(
            (Math.random() * (179 - -179) + -179).toFixed(12)
          ),
          stats: { steps: 0, distance: 0, completed: false }
        }
      }
    };

    mainTest.socket.defaultSocket?.emit(event, data);
  });
});
