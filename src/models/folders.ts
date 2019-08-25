import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

interface FolderInterface extends Document {
  name: string;
  userId: string;
}

const folderSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
});

const folderModel = mongoose.model<FolderInterface>('Folder', folderSchema);

export {folderModel, FolderInterface};
