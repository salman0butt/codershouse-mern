import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document {
    phone: string;
    activated?: boolean;
    createdAt: string;
  }

const userSchema: Schema = new Schema({
    phone: { type: String, required: true },
    activated: {type: Boolean, required: false, default: false}
},{
    timestamps: true
});


const UserModel: Model<User> = mongoose.model<User>('User', userSchema, 'users');

export default UserModel;