import { Request, Response } from 'express';
import OtpService from '../services/otp-service';
import hashService from '../services/hash-service';
import otpService from '../services/otp-service';
import userService from '../services/user-service';
import tokenService from '../services/token-service';
import UserDto from '../dtos/user-dto';
import { User } from '../models/user-model'
class AuthController {

    async sendOtp(req: Request, res: Response) {

        const { phone } = req.body || {};

        if (!phone) {
            return res.status(400).json({ message: 'Phone field is required!' });
        }

        const otp = await OtpService.generateOtp();

        // Hash
        const ttl = 1000 * 60 * 2;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        // send OTP
        try {
            // await otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    }

    async verifyOtp(req: Request, res: Response) {
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${phone}.${otp}.${expires}`;

        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP' });
        }

        let user: User;

        try {
            user = await userService.findUser({ phone });
            if (!user) {
                user = await userService.createUser({ phone });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }

        // Token
        const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id, activated: false });

        await tokenService.storeRefreshToken(refreshToken, user._id);

        res.cookie('refreshtoken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        const userDto = new UserDto(user);

        res.json({ user: userDto, auth: true });

    }

    async refresh(req: Request, res: Response): Promise<any> {

        // get refresh token from cookie
        const { refreshToken: refreshTokenFromCookie } = req.cookies;

        // check if token is valid
        let userData: User;
        try {
            userData = await tokenService.verifyAccessToken(
                refreshTokenFromCookie
            );
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }

        //Check if token is in db
        try {
            const token = tokenService.findRefreshToken(userData._id, refreshTokenFromCookie);
            if (!token) {
                return res.status(401).json({ message: 'Internal error' })
            }
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }

        // check if valid user
        const user = await userService.findUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: 'No user' })
        }

        // Genrate new tokens
        const { refreshToken, accessToken } = tokenService.generateTokens({ _id: userData._id });
        
        // Update refersh token
        try {
            tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }

        // Put it in cookie
        res.cookie('refreshtoken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        const userDto = new UserDto(user);

        res.json({ user: userDto, auth: true });
    }
}

export default new AuthController();