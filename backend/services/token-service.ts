import jwt, { SignOptions } from 'jsonwebtoken';


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

}

export default new TokenService();