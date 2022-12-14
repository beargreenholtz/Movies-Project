import mongoose, { PopulatedDoc } from 'mongoose';

const Schema = mongoose.Schema;

interface ICreateVideo extends Document {
  _id: any;
  title: string;
  description: string;
  genre: string;
  vidurl: string;
  creator?: mongoose.Types.ObjectId | PopulatedDoc<IUser>;
  likeCounter: number;
  userliked?: mongoose.Types.ObjectId[];
}

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

const videoSchema = new Schema<ICreateVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  vidurl: { type: String, required: true },
  likeCounter: { type: Number, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  userliked: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('Video', videoSchema);
