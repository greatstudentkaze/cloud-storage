import mongoose, { Document } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

import { IUser } from './user';

export interface IFile extends Document {
  name: string,
  type: string,
  size: number,
  path: string,
  date: Date,
  accessLink?: string,
  parent: IFile['_id'],
  user: IUser['_id'],
  children: IFile['_id'][],
}

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

export default mongoose.model<IFile>('File', fileSchema);
