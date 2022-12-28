import mongoose from 'mongoose';

import app from './app';
import { init } from './socket';

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	const server = app.listen(process.env.PORT);

	init(server);
});
