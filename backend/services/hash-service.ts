import crypto from 'crypto';

class HashService {
    hashOtp(data: string): string {
        return crypto
            .createHmac('sha256', process.env.HASH_SECERT as string)
            .update(data)
            .digest('hex');
    }
}

export default new HashService;