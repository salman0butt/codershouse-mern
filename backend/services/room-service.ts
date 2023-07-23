import RoomModel from '../models/room-model';

class RoomService {
    async create(payload: any) {
        const { topic, roomType, ownerId } = payload;
        const room = await RoomModel.create({
            topic,
            roomType,
            ownerId,
            speakers: [ownerId],
        });
        return room;
    }

    async getAllRooms(types: string[]) {
        const rooms = await RoomModel.find({ roomType: { $in: types } })
            .populate('speakers')
            .populate('ownerId')
            .exec();
        return rooms;
    }

    async getRoom(roomId:string) {
        const room = await RoomModel.findOne({ _id: roomId });
        return room;
    }
}

export default new RoomService();