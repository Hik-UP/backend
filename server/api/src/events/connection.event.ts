import { Socket } from 'socket.io';

import { hike } from '../events/hike/hike.event';

function connection(socket: Socket) {
  socket.onAny((eventName, ...args) => {
    console.log(eventName);
  });
  hike(socket);
}

export { connection };
