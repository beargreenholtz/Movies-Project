import { Server } from 'socket.io';
import http from 'http';
import { setServers } from 'dns';

let io: Server;

export const init = (httpServer: http.Server) => {
	io = new Server(httpServer, {
		cors: {
			origin: 'http://localhost:3000',
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

