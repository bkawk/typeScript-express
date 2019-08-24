import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  apiKey: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKey: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);


