import { Server } from 'socket.io';

let io: any;

module.exports = {
  init: (httpServer: any, config: any) => {
    io = new Server(httpServer, {
      cors: {
        origin: 'http://localhost:3000',
      },
    });
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error('socket is not connected');
    }
    return io;
  },
};
