import mongoose, {model, Schema, Document, Model} from 'mongoose'


export interface IUser extends Document {
  uid: string,
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
  name: {
    type: String,
    required: true,
  },
  email: String,
  thumbnailImage: String,
  profileImage: String,
  role: String,
})

export const User = mongoose.models.User as Model<IUser, {}, {}, {}> || model<IUser>('User', UserSchema)
