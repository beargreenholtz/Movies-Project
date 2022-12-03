import express from 'express';
import HttpError from '../models/http-error';
import jwt from 'jsonwebtoken';

module.exports = (
  req: express.Request | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('auth fail');
    }
    const decodedToken: any = jwt.verify(token, 'supersecret_dont_share');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('auth failed', 401);
    return next(error);
  }
};
