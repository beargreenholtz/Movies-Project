const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  videos: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Video' }],
  videosliked: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Video' }],
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
