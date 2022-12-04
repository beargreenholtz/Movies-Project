const uuid = require('uuid/v4');
// const { validationResult } = require('express-validator');
import { RequestHandler } from 'express';
const mongoose = require('mongoose');
import express from 'express';

import HttpError from '../models/http-error';
import Video from '../models/video';
import User from '../models/user';

interface IVideo {
  toObject(_: { getters: boolean }): unknown;
}

const getVideoById: RequestHandler = async (req, res, next) => {
  const vid = req.params.vid;

  let video;
  try {
    video = await Video.findById(vid);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a video.',
      500
    );
    return next(error);
  }

  if (!video) {
    const error = new HttpError(
      'Could not find video for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ video: video.toObject({ getters: true }) });
};

const getVideosByUserId: RequestHandler = async (req, res, next) => {
  const userId = req.params.uid;

  // let places;
  let userWithVideos;
  try {
    userWithVideos = await User.findById(userId).populate('videos');
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!userWithVideos || userWithVideos.places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({
    video: userWithVideos.places.map(
      (video: { toObject: (_: { getters: boolean }) => any }) =>
        video.toObject({ getters: true })
    ),
  });
};

const getAllVideos: RequestHandler = async (req, res, next) => {
  let video: IVideo[];
  try {
    video = await Video.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching videos failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    video: video.map((video: IVideo) => video.toObject({ getters: true })),
  });
};

const createVideo: RequestHandler = async (req, res, next) => {
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

  // if (!user) {
  //   const error = new HttpError('Could not find user for provided id', 404);
  //   return next(error);
  // }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdVideo.save({ session: sess });
    user.videos.push(createdVideo);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating video failed, please try again.',
      500
    );
    return next(error);
  }

  console.log(user);

  res.status(201).json({ video: createdVideo });
};

const deleteVideo: RequestHandler = async (
  req: express.Request | any,
  res,
  next
) => {
  const videoId = req.params.vid;
  let video;
  try {
    video = await Video.findById(videoId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete video.',
      500
    );
    return next(error);
  }

  if (!video) {
    const error = new HttpError('Could not find video for this id.', 404);
    return next(error);
  }

  if (video.creator.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delte this place ',
      401
    );
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
    const error = new HttpError(
      'Something went wrong, could not delete video.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted video.' });
};

const addLike: RequestHandler = async (req, res, next) => {
  const userId = req.body.userId;
  const videoId = req.params.vid;
  let video;
  try {
    video = await Video.findById(videoId);
  } catch (err) {
    const error = new HttpError('finding video failed', 500);
    return next(error);
  }

  console.log(JSON.stringify(video.creator) === `"${userId}"`);

  if (userId) {
    if (!video.userliked.includes(userId) && JSON.stringify(video.creator) === `"${userId}"` === false) {
      try {
        mongoose.set('useFindAndModify', false);
        Video.findOneAndUpdate(
          { _id: videoId },
          { $inc: { likeCounter: 1 } },
          { new: true },
          function (err: any, response: any) {
            // do something
            // console.log(err + response);
          }
        );

        Video.findOneAndUpdate(
          { _id: videoId },
          { $push: { userliked: userId } },
          function (error: any, success: any) {
            if (error) {
            } else {
            }
          }
        );
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not add like to the video.',
          500
        );
        return next(error);
      }
    } else {
      const error = new HttpError('You cant like two times', 400);
      return next(error);
    }
  }
  res.status(200).json({ message: 'like added' });
};

exports.getVideoById = getVideoById;
exports.getVideosByUserId = getVideosByUserId;
exports.createVideo = createVideo;
exports.deleteVideo = deleteVideo;
exports.getAllVideos = getAllVideos;
exports.addLike = addLike;
