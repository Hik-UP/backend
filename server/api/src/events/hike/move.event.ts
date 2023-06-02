import { Socket } from 'socket.io';

import { logger } from '../../utils/logger.util';

function move(socket: Socket) {
  return function (...args: any[]) {
    try {
      const { data } = args[0];
      const hiker = {
        id: socket.data.hiker?.id,
        latitude: data.hiker?.latitude,
        longitude: data.hiker?.longitude,
        stats: data.hiker?.stats
      };
      socket.to(socket.data.hike?.id).emit(
        'hikerMoved',
        JSON.stringify({
          hiker: hiker
        })
      );
      socket.data.hiker = hiker;
      logger.info('Socket: Hiker move succeed');
    } catch (error) {
      console.log(error);
      logger.error('Socket: Hiker move failed');
    }
  };
}

export { move };
