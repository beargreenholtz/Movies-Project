const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import { RequestHandler } from 'express';

import HttpError from '../models/http-error';

import User from '../models/user';

interface IUser {
  toObject(_: { getters: boolean }): unknown;
  _id: string;
  name: string;
  email: string;
  __v: unknown;
  id?: string;
  password?: string;
  videos: string[];
}

const getUsers: RequestHandler = async (req, res, next) => {
  let users: IUser[];
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    users: users.map((user: IUser) => user.toObject({ getters: true })),
  });
};

const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const email = req.body['email'] as string;
  const password = req.body['password'] as string;
  const name = req.body['name'] as string;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again ',
      500
    );
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    videos: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  let token: unknown;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login: RequestHandler = async (req, res, next) => {
  const email = req.body['email'] as string;
  const password = req.body['password'] as string;

  let existingUser: {
    id: string;
    password: string;
    email: string;
    toObject(_: { getters: boolean }): unknown;
  };

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid password, could not log you in.', 401);
    return next(error);
  }

  let token: unknown;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.id,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
