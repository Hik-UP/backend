import { Socket } from 'socket.io';

import { dbUser } from '../../models/user/user.model';
import { logger } from '../../utils/logger.util';

function disconnect(socket: Socket) {
  return async function (...args: any[]) {
    try {
      const hiker = socket.data.hiker;

      await dbUser.hike.stats.update(hiker.id, socket.data.hike.id, {
        steps: hiker.stats.steps,
        distance: hiker.stats.distance,
        completed: hiker.stats.completed
      });
      socket.to(socket.data.hike?.id).emit(
        'hikeLeaved',
        JSON.stringify({
          hiker: hiker
        })
      );
      logger.info('Socket: Hiker disconnect succeed');
    } catch {
      logger.error('Socket: Hiker disconnect failed');
    }
  };
}

export { disconnect };
