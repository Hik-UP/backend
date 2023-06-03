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
        id: socket.data.hiker?.id,
        latitude: data.hiker?.latitude,
        longitude: data.hiker?.longitude,
        stats: data.hiker?.stats
      };
      socket.to(socket.data.hike?.id).emit(
        'hike:hiker:move',
        JSON.stringify({
          hiker: hiker
        })
      );
      socket.data.hiker = hiker;
      logger.info('Socket: Hiker move succeed');
    } catch {
      logger.error('Socket: Hiker move failed');
    }
  };
}

export { move };
