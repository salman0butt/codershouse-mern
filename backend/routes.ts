import { Router } from "express";
import AuthController from './controllers/auth-controller';

const router: Router = Router();

router.post('/api/send-otp', AuthController.sendOtp);
router.post('/api/verify-otp', AuthController.verifyOtp);


export default router;
