import { Router } from "express";
import AuthController from './controllers/auth-controller';

const router = Router();

router.post('/api/send-otp', AuthController.sendOtp)


export default router;
