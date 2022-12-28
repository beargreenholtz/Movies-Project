import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const videoSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	genre: { type: String, required: true },
	vidurl: { type: String, required: true },
	likeCounter: { type: Number, required: true },
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
	userliked: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('Video', videoSchema);
