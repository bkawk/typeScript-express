import * as mongoose from 'mongoose';
import { Document, Schema} from 'mongoose';

interface UserModelInterface extends Document {
  email: string;
  password: string;
  apiKey: string;
}

const userSchema: Schema = new Schema({
  apiKey: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model<UserModelInterface>('User', userSchema);

export {userModel, UserModelInterface};
