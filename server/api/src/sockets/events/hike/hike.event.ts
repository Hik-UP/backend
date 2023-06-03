import { Socket } from 'socket.io';

import { join } from './join.event';
import { move } from './move.event';
import { disconnect } from './disconnect.event';

function hike(socket: Socket) {
  socket.on('hike:hiker:join', join(socket));
  socket.on('hike:hiker:move', move(socket));
  socket.on('disconnect', disconnect(socket));
}

export { hike };
