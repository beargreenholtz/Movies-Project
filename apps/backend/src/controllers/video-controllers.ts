import { Request, RequestHandler } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { getIO } from '../socket';

import HttpError from '../models/http-error';
import Video from '../models/video';
import User from '../models/user';

interface IVideo {
	toObject(arg0: { getters: boolean }): any;
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

interface IVideopop {
	remove(arg0: unknown): unknown;
	toObject(arg0: { getters: boolean }): any;
	_id: string;
	description: string;
	genre: string;
	id: string;
	likeCounter: number;
	title: string;
	userliked: [_: string | null];
	vidurl: string;
	creator: mongoose.Types.ObjectId | any;
}

export interface IDecodedToken {
	readonly userId: string;
}

interface RequestWithUserData extends Request {
	userData?:
		| {
				userId: string;
		  }
		| undefined;
}

export const getVideoById: RequestHandler = async (req, res, next) => {
	const vid = req.params['vid'];

	if (!vid) {
		return next();
	}

	let video;
	try {
		video = await Video.findById(vid);
	} catch (err) {
		const error = new HttpError('Something went wrong, could not find a video.', 500);
		return next(error);
	}

	if (!video) {
		const error = new HttpError('Could not find video for the provided id.', 404);
		return next(error);
	}

	res.json({ video: video.toObject({ getters: true }) });
};

export const getAllVideos: RequestHandler = async (_, res, next) => {
	let video: IVideo[];
	try {
		video = await Video.find({});
	} catch (err) {
		const error = new HttpError('Fetching videos failed, please try again later.', 500);
		return next(error);
	}

	res.json({
		video: video.map((video: IVideo) => video.toObject({ getters: true })),
	});
};

export const createVideo: RequestHandler = async (req, res, next) => {
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	//   return next(
	//     new HttpError('Invalid inputs passed, please check your data.', 422)
	//   );
	// }

	const title = req.body['title'] as string;
	const description = req.body['description'] as string;
	const genre = req.body['genre'] as string;
	const vidurl = req.body['vidurl'] as string;
	const creator = req.body['creator'] as string;

	const createdVideo = new Video({
		title,
		description,
		genre,
		vidurl,
		creator,
		likeCounter: 0,
	});

	let user;
	try {
		user = await User.findById(creator);
	} catch (err) {
		const error = new HttpError('Creating video failed, please try again', 500);
		return next(error);
	}

	if (!user) {
		const error = new HttpError('Could not find user for provided id', 404);
		return next(error);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdVideo.save({ session: sess });
		user.videos.push(createdVideo as any);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError('Creating video failed, please try again.', 500);
		return next(error);
	}

	res.status(201).json({ video: createdVideo });
};

export const deleteVideo: RequestHandler = async (req: RequestWithUserData, res, next) => {
	const videoId = req.params['vid'];

	if (!videoId) {
		return next();
	}

	let video: IVideopop | null;

	try {
		video = await Video.findById(videoId).populate('creator');
	} catch (err) {
		const error = new HttpError('Something went wrong, could not delete video.', 500);
		return next(error);
	}

	if (!video?.creator || !video) {
		const error = new HttpError('Could not find video for this id.', 404);
		return next(error);
	}

	if (video.creator.id !== req.userData?.userId) {
		const error = new HttpError('You are not allowed to delte this place ', 401);
		return next(error);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await video.remove({ session: sess });
		video.creator.videos.pull(video);
		await video.creator.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError('Something went wrong, could not delete video.', 500);
		return next(error);
	}

	res.status(200).json({ message: 'Deleted video.' });
};

export const addLike: RequestHandler = async (req: RequestWithUserData, res, next) => {
	const videoId = req.params['vid'];

	if (!videoId) {
		return next();
	}

	let video: IVideo | null;

	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		throw new Error('auth fail');
	}
	const decodedToken = jwt.verify(token, 'supersecret_dont_share') as IDecodedToken;
	req.userData = { userId: decodedToken.userId };

	const userId = req.userData.userId;

	if (!userId) {
		const error = new HttpError('Missing User Id', 400);

		return next(error);
	}

	try {
		video = await Video.findById(videoId);
	} catch (err) {
		const error = new HttpError('finding video failed', 500);
		return next(error);
	}

	if (video === null) {
		const error = new HttpError('finding video failed', 400);
		return next(error);
	}

	if (video.userliked.includes(userId)) {
		try {
			await Video.findOneAndUpdate(
				{ _id: videoId },
				{ $inc: { likeCounter: -1 }, $pull: { userliked: userId } },
				{ new: true },
			);
		} catch (err) {
			console.log(err);

			const error = new HttpError('Something went wrong, could not add like to the video.', 500);
			return next(error);
		}
	} else {
		if (video.creator.toString() !== userId) {
			try {
				await Video.findOneAndUpdate(
					{ _id: videoId },
					{ $inc: { likeCounter: 1 }, $push: { userliked: userId } },
					{ new: true },
				);

				const likeUserName = await User.findById(userId);

				if (likeUserName !== null) {
					getIO().emit('likes', {
						likeUserName: likeUserName.name,
						likedVideoTitle: video.title,
						vidCreator: video.creator,
					});
				}
			} catch (err) {
				console.log(err);

				const error = new HttpError('Something went wrong, could not add like to the video.', 500);
				return next(error);
			}
		} else {
			const error = new HttpError('You cant like two times', 400);
			return next(error);
		}
	}

	res.status(200).json({ message: 'like added' });
};
