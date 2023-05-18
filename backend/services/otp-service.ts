import crypto from 'crypto';
import hashService from './hash-service'

const smsSid: string = process.env.SMS_SID!;
const smsAuthToken: string = process.env.SMS_AUTH_TOKEN!;
const smsFromNumber: string = process.env.SMS_FROM_NUMBER!;
// const twilio = require('twilio')(smsSid, smsAuthToken, {
//     lazyLoading: true,
// });

class OtpService {
    async generateOtp(): Promise<number> {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBySms(phone: string, otp: number): Promise<any> {
        // return await twilio.messages.create({
        //     to: phone,
        //     from: smsFromNumber,
        //     body: `Your codershouse OTP is ${otp}`,
        // });
    }

    verifyOtp(hashedOtp: string, data: string): boolean {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

export default new OtpService();