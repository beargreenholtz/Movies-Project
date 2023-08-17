import type http from 'http';

import { Server } from 'socket.io';

let io: Server;

export const init = (httpServer: http.Server) => {
	io = new Server(httpServer, {
		cors: {
			origin: 'http://localhost:4200',
			methods: ['GET', 'POST'],
		},
	});

	return io;
};

export const getIO = () => {
	if (!io) {
		throw new Error('socket is not connected');
	}

	return io;
};
