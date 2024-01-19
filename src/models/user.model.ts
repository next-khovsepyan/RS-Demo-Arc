import mongoose, { Schema, Document, Model } from 'mongoose';

/*
  For production ready code, we need to separate the model and the interface.
*/  

// User Types
export const TYPE_GUEST = 'guest';
export const TYPE_USER = 'user';
export const TYPE_ADMIN = 'admin';
export type UserType = typeof TYPE_GUEST | typeof TYPE_USER | typeof TYPE_ADMIN;

// User Interface
interface User extends Document {
  username: string;
  password: string;
  udid: string;
  platform: string;
  region: string;
  appId: string;
  osVersion: string;
  appVersion: string;
  deviceToken: string;
  type: UserType;
}

// User Model Interface
interface IUserModel extends Model<User> {
  getUser(udid: string): Promise<User | null>;
  createGuest(
    udid: string,
    platform: string,
    region: string,
    appId: string,
    osVersion: string,
    appVersion: string,
    deviceToken: string
  ): Promise<User>;
}

// User Schema
const userSchema = new Schema<User>({
  username: { type: String },
  password: { type: String },
  udid: { type: String, required: true },
  platform: { type: String },
  region: { type: String },
  appId: { type: String },
  osVersion: { type: String },
  appVersion: { type: String },
  deviceToken: { type: String },
  type: {
    type: String,
    enum: [TYPE_GUEST, TYPE_USER, TYPE_ADMIN],
    default: TYPE_GUEST
  },
}, {
  timestamps: true,
});

// Static Methods
userSchema.statics.getUser = async function (udid: string): Promise<User | null> {
  return this.findOne({ udid });
};

userSchema.statics.createGuest = async function (
  udid, platform, region, appId, osVersion, appVersion, deviceToken
): Promise<User> {
  return this.create({ udid, platform, region, appId, osVersion, appVersion, deviceToken, type: TYPE_GUEST });
};

// User Model
const UserModel: IUserModel = mongoose.model<User, IUserModel>('User', userSchema);

export default UserModel;
