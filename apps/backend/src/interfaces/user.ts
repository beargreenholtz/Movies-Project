import type mongoose from 'mongoose';
import type { Request } from 'express';
import type { IVideopop } from './video';

enum UserRole {
	User = 'user',
	Admin = 'admin',
}

export interface IUser {
	save(arg0: unknown): unknown;
	toObject(_: { getters: boolean }): unknown;
	_id: string;
	name: string;
	email: string;
	__v: unknown;
	id?: string;
	password?: string;
	videos: mongoose.Types.Array<IVideopop>;
	role: UserRole;
}

export interface RequestWithUserData extends Request {
	userData?:
		| {
				userId: string;
		  }
		| undefined;
}
