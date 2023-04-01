import { Request, Response } from 'express';
import OtpService from '../services/otp-service';

class AuthController {

    sendOtp(req: Request, res: Response) {

        const { phone } = req.body || {};

        if(!phone) {
            return res.status(400).json({ message: 'Phone field is required!'});
        }

        const otp = OtpService.genrateOtp();

        return res.send('Hello from otp');
    }
}

export default new AuthController();