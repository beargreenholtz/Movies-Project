import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';

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

export const getUsers: RequestHandler = async (_, res, next) => {
	let users: IUser[];

	try {
		users = await User.find({}, '-password');
	} catch (err) {
		const error = new HttpError('Fetching users failed, please try again later.', 500);

		return next(error);
	}

	res.json({
		users: users.map((user: IUser) => user.toObject({ getters: true })),
	});
};

export const signup: RequestHandler = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	}

	const email = req.body['email'] as string;
	const password = req.body['password'] as string;
	const name = req.body['name'] as string;

	let existingUser;

	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('Signing up failed, please try again later.', 500);

		return next(error);
	}

	if (existingUser) {
		const error = new HttpError('User exists already, please login instead.', 422);

		return next(error);
	}

	let hashedPassword;

	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		const error = new HttpError('Could not create user, please try again ', 500);

		throw error;
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
		token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, 'supersecret_dont_share', {
			expiresIn: '1h',
		});
	} catch (err) {
		const error = new HttpError('Signing up failed, please try again.', 500);

		return next(error);
	}

	const transporter = await nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'moviesnowproject@gmail.com',
			pass: 'bqpdwdyngvbhhvap',
		},
	});

	const mailOptions = {
		from: 'moviesnowproject@gmail.com',
		to: email,
		subject: 'Welcome to Moviesnow',
		html: '<img src="https://media.istockphoto.com/id/672526776/photo/cheddar-cheese-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=T6ykJOn4asR7Z21IG9D-ZdNUhEAHFW14lyqeq6a8io0=" alt="Chedder">',
	};

	await transporter.sendMail(mailOptions);

	res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};

export const login: RequestHandler = async (req, res, next) => {
	const email = req.body['email'] as string;
	const password = req.body['password'] as string;

	let existingUser: IUser | null;

	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('Logging in failed, please try again later.', 500);

		return next(error);
	}

	if (!existingUser) {
		const error = new HttpError('Invalid credentials, could not log you in.', 401);

		return next(error);
	}

	let isValidPassword = false;

	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password!);
	} catch (err) {
		const error = new HttpError('Invalid credentials, could not log you in.', 401);

		return next(error);
	}

	if (!isValidPassword) {
		const error = new HttpError('Invalid password, could not log you in.', 401);

		return next(error);
	}

	let token: string;

	try {
		token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, 'supersecret_dont_share', {
			expiresIn: '1h',
		});
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
