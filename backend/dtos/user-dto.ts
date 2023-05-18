import { User } from '../models/user-model'

class UserDto {
    id: string;
    phone: string;
    activated: boolean;
    createdAt: string;

    constructor(user: User) {
        this.id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

export default UserDto;