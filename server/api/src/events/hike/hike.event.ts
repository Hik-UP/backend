import { Socket } from 'socket.io';

import { join } from './join.event';
import { move } from './move.event';
import { disconnect } from './disconnect.event';

function hike(socket: Socket) {
  socket.on('join', join(socket));
  socket.on('move', move(socket));
  socket.on('disconnect', disconnect(socket));
}

export { hike };
