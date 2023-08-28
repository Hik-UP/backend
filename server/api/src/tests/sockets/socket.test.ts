/* istanbul ignore file */
import { Socket } from 'socket.io-client';

import { req } from './req.test';
import { verify } from './verify.test';

let defaultSocket: Socket | undefined;

const socket = {
  defaultSocket,
  req,
  verify
};

export { socket };
