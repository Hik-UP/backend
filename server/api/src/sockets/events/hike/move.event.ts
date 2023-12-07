import { Socket } from 'socket.io';

import { dbUser } from '../../../models/user/user.model';
import { hikeJOI } from '../../middlewares/validator/hike/hike.validator';
import { logger } from '../../../utils/logger.util';

function calcCrow(pos1: { lat: number, long: number }, pos2: { lat: number, long: number }): number {
  if ((pos1.lat == pos2.lat) && (pos1.long == pos2.long)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * pos1.lat/180;
    var radlat2 = Math.PI * pos2.lat/180;
    var theta = pos1.long-pos2.long;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344
    return dist;
  }
}

function move(socket: Socket) {
  return async function (req: any, callback: any) {
    try {
      if (hikeJOI.move.validate(req.data).error) {
        throw '';
      }

      const { data } = req;
      const hiker = {
        id: socket.data.hiker.id,
        username: socket.data.hiker.username,
        picture: socket.data.hiker.picture,
        skin: socket.data.hiker.skin,
        latitude: data.hiker.latitude,
        longitude: data.hiker.longitude,
        stats: data.hiker.stats
      };
      const { coins } = (await dbUser.hike.coins.retrieve(socket.data.hike.id)) || {};
      var coinId = null;
      var isEnded = false;

      for (var i = 0; coins !== undefined && i < coins.length; i += 1) {
        const distance = calcCrow({ lat: data.hiker.latitude, long: data.hiker.longitude }, { lat: coins[i].latitude, long: coins[i].longitude });

        if (distance < 0.02) {
          coinId = coins[i].id;
          await dbUser.hike.coins.get(socket.data.hiker.id, socket.data.hike.id, coinId);

          if (coins.length - 1 === 0) {
            isEnded = true;
            await dbUser.hike.update({id: socket.data.hike.id, status: 'DONE' });

            socket.to(socket.data.hike.id).emit(
              'hike:end',
              JSON.stringify({
                message: "Done"
              })
            );
          }
          socket.to(socket.data.hike.id).emit(
            'hike:coin:get',
            JSON.stringify({
              coin: { id: coinId }
            })
          );
          logger.socket.info('Hiker coin transfer succeed');
          break;
        }
      }
      socket.to(socket.data.hike.id).emit(
        'hike:hiker:move',
        JSON.stringify({
          hiker: hiker
        })
      );
      socket.data.hiker = hiker;

      if (callback) {
        callback(JSON.stringify({ coin: coinId, end: isEnded }));
      }
      logger.socket.info('Hiker move succeed');
    } catch {
      logger.socket.error('Hiker move failed');
      socket.disconnect();
    }
  };
}

export { move };
