import { Types } from "mongoose";

class RoomDto {
    id: Types.ObjectId;
    topic: string;
    roomType: string;
    speakers: Types.ObjectId[];
    ownerId: Types.ObjectId;
    createdAt: Date;

    constructor(room: any) {
        this.id = room._id;
        this.topic = room.topic;
        this.roomType = room.roomType;
        this.ownerId = room.ownerId;
        this.speakers = room.speakers;
        this.createdAt = room.createdAt;
    }
}

export default RoomDto;
