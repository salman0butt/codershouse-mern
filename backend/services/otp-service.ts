import crypto from 'crypto';

class OtpService {

    genrateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    sendBySms() {

    }

    verifyOtp() {
         
    }

}

export default new OtpService;