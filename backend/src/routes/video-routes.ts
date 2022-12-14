import express from 'express';

import checkAuth from '../middleware/check-auth';
import {
  getAllVideos,
  getVideoById,
  addLike,
  createVideo,
  deleteVideo,
} from '../controllers/video-controllers';

const router = express.Router();

router.get('/fetchAllVideos', getAllVideos);

router.get('/:vid', getVideoById);

router.use(checkAuth);
router.post('/addLike/:vid', addLike);

router.post('/addVid', createVideo);

router.delete('/:vid', deleteVideo);

export default router;
