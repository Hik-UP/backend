import { Server } from 'socket.io';

import { auth } from './middlewares/sockets/auth.socket';
import { hike } from './models/user/hike/hike.model';

function createSocket(): Server {
  const io = new Server();

  io.use(auth);

  io.on('connection', (socket) => {
    socket.emit('a new client connected');
    console.log('a user connected');
    socket.onAny((eventName, ...args) => {
      console.log(eventName);
    });
    socket.on('joinHike', async (data) => {
      const stats = (await hike.stats.retrieve(
        socket.handshake.query.id?.toString() || '',
        data.data.hike.id
      )) || [{ steps: 0, distance: 0, completed: false }];
      const hiker = {
        id: socket.handshake.query.id?.toString(),
        latitude: data.data.hiker.latitude,
        longitude: data.data.hiker.longitude,
        stats: {
          steps: stats[0].steps,
          distance: stats[0].distance,
          completed: stats[0].completed
        }
      };
      const sockets = await io.in(data.data.hike.id).fetchSockets();
      const hikers = sockets.map((socket) => {
        return { hike: socket.data.hike, hiker: socket.data.hiker };
      });

      socket.join(data.data.hike.id);
      io.to(data.data.hike.id).emit(
        'hikeJoined',
        JSON.stringify({
          hiker: hiker
        })
      );
      io.to(socket.id).emit(
        'joinHikeSuccess',
        JSON.stringify({ stats: stats[0], hikers: hikers })
      );
      socket.data.hike = data.data.hike;
      socket.data.hiker = hiker;
    });
    socket.on('move', async (data) => {
      const hiker = {
        id: socket.data.hiker?.id,
        latitude: data.data.hiker?.latitude,
        longitude: data.data.hiker?.longitude,
        stats: data.data.hiker?.stats
      };
      io.to(socket.data.hike?.id).emit(
        'hikerMoved',
        JSON.stringify({
          hiker: hiker
        })
      );
      socket.data.hiker = hiker;
      console.log(hiker);
    });
    socket.on('disconnect', async () => {
      const hiker = socket.data.hiker;

      await hike.stats.update(hiker.id, socket.data.hike.id, {
        steps: hiker.stats.steps,
        distance: hiker.stats.distance,
        completed: hiker.stats.completed
      });
      console.log(hiker);
      io.to(socket.data.hike?.id).emit(
        'hikeLeaved',
        JSON.stringify({
          hiker: hiker
        })
      );
      console.log('user disconnected');
    });
  });
  return io;
}

const socket: Server = createSocket();

export { socket };
