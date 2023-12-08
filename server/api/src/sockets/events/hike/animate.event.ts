import { Socket } from 'socket.io';

import { dbUser } from '../../../models/user/user.model';
import { hikeJOI } from '../../middlewares/validator/hike/hike.validator';
import { logger } from '../../../utils/logger.util';

function animate(socket: Socket) {
  return function (req: any) {
    try {
      if (hikeJOI.animate.validate(req.data).error) {
        throw '';
      }

      const { data } = req;
      const hiker = {
        id: socket.data.hiker.id,
        skinState: data.hiker.skinState,
      };

      socket.to(socket.data.hike.id).emit(
        'hike:hiker:animate',
        JSON.stringify({
          hiker: hiker
        })
      );
      socket.data.hiker.skinState = data.hiker.skinState;

      logger.socket.info('Hiker animate succeed');
    } catch {
      logger.socket.error('Hiker animate failed');
      socket.disconnect();
    }
  };
}

export { animate };
