import { Router } from "express";
import authController from './controllers/auth-controller';
import activateController from './controllers/activate-controller';
import authMiddleware from './middlewares/auth-middleware';
import roomsController from './controllers/rooms-controller';

const router: Router = Router();

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/activate', authMiddleware, activateController.activate);
router.get('/api/refresh', authMiddleware, authController.refresh);
router.post('/api/logout', authMiddleware, authController.logout);
router.post('/api/rooms', authMiddleware, roomsController.create);
router.get('/api/rooms', authMiddleware, roomsController.index);
router.get('/api/rooms/:roomId', authMiddleware, roomsController.show);


export default router;
