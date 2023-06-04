import { Socket } from 'socket.io';

import { hikeJOI } from '../../middlewares/validator/hike/hike.validator';
import { logger } from '../../../utils/logger.util';

function move(socket: Socket) {
  return function (req: any) {
    try {
      if (hikeJOI.move.validate(req.data).error) {
        throw '';
      }

      const { data } = req;
      const hiker = {
        id: socket.data.hiker.id,
        username: socket.data.hiker.username,
        picture: socket.data.hiker.picture,
        latitude: data.hiker.latitude,
        longitude: data.hiker.longitude,
        stats: data.hiker.stats
      };
      socket.to(socket.data.hike.id).emit(
        'hike:hiker:move',
        JSON.stringify({
          hiker: hiker
        })
      );
      socket.data.hiker = hiker;
      logger.socket.info('Hiker move succeed');
    } catch {
      logger.socket.error('Hiker move failed');
      socket.disconnect();
    }
  };
}

export { move };
