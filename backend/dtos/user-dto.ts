import { User } from '../models/user-model'

class UserDto {
    id: string;
    phone: string;
    name: string;
    avatar: string;
    activated: boolean;
    createdAt: string;

    constructor(user: User) {
        this.id = user._id;
        this.phone = user.phone;
        this.name = user.name;
        this.avatar = user.avatar;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

export default UserDto;