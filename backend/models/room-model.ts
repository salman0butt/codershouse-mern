import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IRoom extends Document {
    topic: string;
    roomType: string;
    ownerId: Types.ObjectId;
    speakers?: Types.ObjectId[];
}

const roomSchema: Schema = new Schema<IRoom>(
    {
        topic: { type: String, required: true },
        roomType: { type: String, required: true },
        ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
        speakers: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Room: Model<IRoom> = mongoose.model<IRoom>('Room', roomSchema, 'rooms');
export default Room;
