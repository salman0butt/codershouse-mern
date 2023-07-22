import jwt, { SignOptions } from 'jsonwebtoken';
import refreshModel from '../models/refresh-model'

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

class TokenService {
    generateTokens(payload: any): Tokens {
        const accessTokenOptions: SignOptions = {
            expiresIn: '1h',
        };
        const refreshTokenOptions: SignOptions = {
            expiresIn: '1y',
        };
        const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECERT, accessTokenOptions);
        const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECERT, refreshTokenOptions);

        return { accessToken, refreshToken };
    }

    async storeRefreshToken(token: string, userId: string) {
        try {
            await refreshModel.create({
                token,
                userId
            });

        } catch (err) {
            console.log(err.message);
        }
    }

    async verifyAccessToken(token: string) {
        return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECERT);
    }

    async verifyRefreshToken(refreshToken: string) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECERT);
    }

    async findRefreshToken(userId: string, refreshToken: string) {
        return await refreshModel.findOne({
            userId: userId,
            token: refreshToken
        });
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        return await refreshModel.updateOne({
            userId: userId
        }, {
            token: refreshToken
        });
    }

    async removeToken(refreshToken: string) {
        return await refreshModel.deleteOne({token: refreshToken});
    }

}

export default new TokenService();