import { Socket } from 'socket.io';

import { dbUser } from '../../../models/user/user.model';
import { hikeJOI } from '../../middlewares/validator/hike/hike.validator';
import { hikeEvents } from './hike.event';
import { logger } from '../../../utils/logger.util';

function join(socket: Socket) {
  return async function (req: any, callback: any) {
    try {
      if (hikeJOI.join.validate(req.data).error) {
        throw '';
      }
      if (socket.data.hike || socket.data.hiker) {
        throw '';
      }

      const { data } = req;
      const {
        username: username,
        picture: picture,
        skin: skin
      } = (await dbUser.findOne(socket.handshake.auth.id.toString())) || {};
      const stats =
        (await dbUser.hike.stats.retrieve(
          socket.handshake.auth.id.toString() || '',
          data.hike.id
        )) || undefined;
      if (!stats) {
        throw '';
      }
      const hiker = {
        id: socket.handshake.auth.id.toString(),
        username: username,
        picture: picture,
        skin: skin?.pictures,
        skinState: 0,
        latitude: data.hiker.latitude,
        longitude: data.hiker.longitude,
        stats: {
          coins: stats[0].coins,
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
        'hike:hiker:join',
        JSON.stringify({
          hiker: hiker
        })
      );

      socket.on('hike:hiker:move', hikeEvents.move(socket));
      socket.on('hike:hiker:animate', hikeEvents.animate(socket));
      socket.on('disconnect', hikeEvents.disconnect(socket));

      socket.data.hike = data.hike;
      socket.data.hiker = hiker;

      if (callback) {
        callback(JSON.stringify({ stats: stats[0], hikers: hikers }));
      }
      logger.socket.info('Hiker join succeed');
    } catch {
      logger.socket.error('Hiker join failed');

      if (callback) {
        callback(JSON.stringify({ error: 'Internal Server Error' }));
      }
      socket.disconnect();
    }
  };
}

export { join };
