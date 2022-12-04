const mongoose = require('mongoose');

const Schema = mongoose.Schema;

interface IVideo {
  title: string;
  description: string;
  genre: string;
  vidurl: string;
  creator: unknown;
}

const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  vidurl: { type: String, required: true },
  likeCounter: { type: Number, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  userliked: [{ type: mongoose.Types.ObjectId, required: false, ref: 'User' }],
});

export default mongoose.model('Video', videoSchema);
