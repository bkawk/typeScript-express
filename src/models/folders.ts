import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  userId: string;
}

const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true }
});

export default mongoose.model<IFolder>('Folder', FolderSchema);


