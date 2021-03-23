import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, default: 0 },
  path: { type: String, default: '' },
  date: { type: Date, default: Date.now() },
  accessLink: { type: String },
  parent: { type: ObjectId, ref: 'File' },
  user: { type: ObjectId, ref: 'User' },
  children: [{ type: ObjectId, ref: 'File' }],
});

export default mongoose.model('File', fileSchema);
