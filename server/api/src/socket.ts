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
      console.log(socket.data.hike);
    });
    socket.on('joinHike', async (data) => {
      const sockets = await io.in(data.data.hike.id).fetchSockets();
      const hikers = sockets.map((socket) => {
        return { hike: socket.data.hike, hiker: socket.data.hiker };
      });

      socket.join(data.data.hike.id);
      io.to(data.data.hike.id).emit(
        'hikeJoined',
        JSON.stringify({
          hiker: {
            latitude: data.data.hiker.latitude,
            longitude: data.data.hiker.longitude
          }
        })
      );
      io.to(socket.id).emit('joinHikeSuccess', JSON.stringify(hikers));
      socket.data.hike = data.data.hike;
      socket.data.hiker = data.data.hiker;
    });
  });
  return io;
}

const socket: Server = createSocket();

export { socket };
