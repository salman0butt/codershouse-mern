import mongoose, { Document, Model, Schema } from "mongoose";

export interface refreshToken extends Document {
    token: string;
    userId: string;
}

const refreshSchema: Schema = new Schema({
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});


const RefreshModel: Model<refreshToken> = mongoose.model<refreshToken>('Token', refreshSchema, 'tokens');

export default RefreshModel;