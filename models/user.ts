import mongoose, {model, Schema, Document, Model} from 'mongoose'


export interface IUser extends Document {
  uid: string,
  status: string,
  name: string,
  email: string,
  thumbnailImage: string,
  profileImage: string,
  role: string,
}

export const UserSchema: Schema<IUser> = new Schema({
  uid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'active',
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  thumbnailImage: {
    type: String,
    default: 'https://user-images.githubusercontent.com/48513798/173180642-8fc5948e-a437-45f3-91d0-3f0098a38195.png',
  },
  profileImage: {
    type: String,
    default: 'https://user-images.githubusercontent.com/48513798/173180642-8fc5948e-a437-45f3-91d0-3f0098a38195.png',
  },
  role: String,
})

export const User = mongoose.models.User as Model<IUser, {}, {}, {}> || model<IUser>('User', UserSchema)
