import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  storageSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  files: [{ type: ObjectId, ref: 'File' }]
});

export default mongoose.model('User', userSchema);
