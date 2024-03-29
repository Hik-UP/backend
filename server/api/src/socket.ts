import { Server, Socket } from 'socket.io';

import { auth } from './sockets/middlewares/auth.socket';
import { hikeEvents } from './sockets/events/hike/hike.event';

function createSocket(): Server {
  const io = new Server();

  io.use(auth);

  io.on('connection', (socket: Socket) => {
    socket.on('hike:hiker:join', hikeEvents.join(socket));
  });
  return io;
}

const socket: Server = createSocket();

export { socket };
