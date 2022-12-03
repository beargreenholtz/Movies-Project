import express from 'express';
import bodyParser from 'body-parser';
import { ErrorRequestHandler } from 'express';
const mongoose = require('mongoose');

import userRouter from './routes/users-routes';
import videoRouter from './routes/video-routes';
import HttpError from './models/http-error';

const app = express();

app.use(bodyParser.json());

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // What IPs can access this server
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PATCH, DELETE, PUT'
    );
    next();
  }
);

app.use('/login', userRouter);

app.use('/video', videoRouter);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  }
);

app.use(((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
}) as ErrorRequestHandler);

mongoose
  .connect(
    'mongodb+srv://manu:SB98ECyaW936NtBF@cluster0.0evekc9.mongodb.net/movies?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err?: Error) => {
    console.log(err);
  });
