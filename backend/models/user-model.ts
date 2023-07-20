import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document {
    phone: string;
    name?: string;
    avatar?: string;
    activated?: boolean;
    createdAt: string;
  }

const userSchema: Schema = new Schema({
    phone: { type: String, required: true },
    name: { type: String, required: false },
    avatar: { type: String, required: false },
    activated: {type: Boolean, required: false, default: false}
},{
    timestamps: true
});


const UserModel: Model<User> = mongoose.model<User>('User', userSchema, 'users');

export default UserModel;