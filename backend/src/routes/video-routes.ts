const express = require('express');
// const { check } = require('express-validator');

import checkAuth = require('../middleware/check-auth');

const videoController = require('../controllers/video-controllers');

const router = express.Router();

router.get('/fetchAllVideos', videoController.getAllVideos);

router.get('/:vid', videoController.getVideoById);

router.get('/user/:uid', videoController.getVideosByUserId);

router.post('/addLike/:vid', videoController.addLike);

router.use(checkAuth);

router.post(
  '/addVid',
  //   [
  //     check('title').not().isEmpty(),
  //     check('description').isLength({ min: 5 }),
  //     check('address').not().isEmpty(),
  //   ],
  videoController.createVideo
);

router.delete('/:vid', videoController.deleteVideo);

export default router;
