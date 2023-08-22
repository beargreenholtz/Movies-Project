import type { IUser } from './user';

export interface IVideo {
	toObject(arg0: { getters: boolean }): unknown;
	_id: string;
	creator: string;
	description: string;
	genre: string;
	id: string;
	likeCounter: number;
	title: string;
	userliked: [_: string | null];
	vidurl: string;
}

export interface IVideopop {
	remove(arg0: unknown): unknown;
	toObject(arg0: { getters: boolean }): unknown;
	_id: string;
	description: string;
	genre: string;
	id: string;
	likeCounter: number;
	title: string;
	userliked: [_: string | null];
	vidurl: string;
	creator: IUser;
}
