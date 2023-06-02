import { Server } from 'socket.io';

import { auth } from './middlewares/sockets/auth.socket';
import { connection } from './events/connection.event';

function createSocket(): Server {
  const io = new Server();

  io.use(auth);

  io.on('connection', connection);
  return io;
}

const socket: Server = createSocket();

export { socket };
