import { Socket } from 'socket.io';

import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';

function join(socket: Socket) {
  return async function (req: any, callback: any) {
    try {
      const { data } = req;
      const stats = (await dbUser.hike.stats.retrieve(
        socket.handshake.auth.id?.toString() || '',
        data.hike.id
      )) || [{ steps: 0, distance: 0, completed: false }];
      const hiker = {
        id: socket.handshake.auth.id?.toString(),
        latitude: data.hiker.latitude,
        longitude: data.hiker.longitude,
        stats: {
          steps: stats[0].steps,
          distance: stats[0].distance,
          completed: stats[0].completed
        }
      };
      const sockets = await socket.in(data.hike.id).fetchSockets();
      const hikers = sockets.map((socket) => {
        return { hike: socket.data.hike, hiker: socket.data.hiker };
      });

      socket.join(data.hike.id);
      socket.to(data.hike.id).emit(
        'hikeJoined',
        JSON.stringify({
          hiker: hiker
        })
      );

      socket.data.hike = data.hike;
      socket.data.hiker = hiker;
      callback(JSON.stringify({ stats: stats[0], hikers: hikers }));
      logger.info('Socket: Hiker join succeed');
    } catch {
      logger.error('Socket: Hiker join failed');
    }
  };
}

export { join };
