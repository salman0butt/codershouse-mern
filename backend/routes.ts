import { Router } from "express";
import authController from './controllers/auth-controller';
import activateController from './controllers/activate-controller';
import authMiddleware from './middlewares/auth-middleware';

const router: Router = Router();

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/activate', authMiddleware, activateController.activate);
router.get('/api/refresh', authMiddleware, authController.refresh);
router.get('/api/logout', authMiddleware, authController.logout);


export default router;
