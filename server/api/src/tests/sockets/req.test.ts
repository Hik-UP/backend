/* istanbul ignore file */
import { io } from 'socket.io-client';

import { IHikeTest } from '../type.test';
import { socket } from './socket.test';
import { vars } from '../vars.test';
import { req as reqAPI } from '../req.test';

function createDefaultSocket(): void {
  socket.defaultSocket = io(
    `https://${process.env.API_HOSTNAME}:${process.env.API_PORT}`,
    {
      rejectUnauthorized: false,
      auth: {
        token: vars.defaultUser.token,
        id: vars.defaultUser.id,
        roles: vars.defaultUser.roles.join(',')
      }
    }
  );
}

function closeDefaultSocket(): void {
  socket.defaultSocket?.close();
  socket.defaultSocket = undefined;
}

async function joinHike(): Promise<IHikeTest> {
  const hike = await reqAPI.createHike();
  const data = {
    data: {
      hike: { id: hike.id },
      hiker: {
        latitude: parseFloat((Math.random() * (89 - -89) + -89).toFixed(12)),
        longitude: parseFloat((Math.random() * (179 - -179) + -179).toFixed(12))
      }
    }
  };

  await socket.defaultSocket?.emitWithAck('hike:hiker:join', data);

  return hike;
}

const req = {
  createDefaultSocket,
  closeDefaultSocket,
  joinHike
};

export { req };
