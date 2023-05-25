import { Server } from 'socket.io';

import { auth } from './middlewares/sockets/auth.socket';

function createSocket(): Server {
  const io = new Server();

  io.use(auth);

  io.on('connection', (socket) => {
    socket.emit('a new client connected');
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.onAny((eventName, ...args) => {
      console.log(eventName);
    });
    socket.on('joinHike', (data) => {
      socket.join(data);
      io.to(data).emit(
        'hikeJoined',
        socket.handshake.query.id?.toString() || 'NULL'
      );
    });
  });
  return io;
}

const socket: Server = createSocket();

export { socket };
