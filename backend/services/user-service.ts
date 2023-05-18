import { FilterQuery } from 'mongoose';
import UserModel, { User } from "../models/user-model";

class UserService {
    async findUser(filter: FilterQuery<User>): Promise<User | null> {
        const user = await UserModel.findOne(filter);
        return user;
    }

    async createUser(data: Partial<User>): Promise<User> {
        const user = await UserModel.create(data);
        return user;
    }

}

export default new UserService();