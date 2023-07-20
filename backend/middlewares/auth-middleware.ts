import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token-service';

interface AuthenticatedRequest extends Request {
    user: any;
}

const authMiddleware = async function (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { accessToken } = req.cookies;

    if(!accessToken) {
        throw new Error();
    }

    // Your authentication logic goes here
    const userData = await tokenService.verifyAccessToken(accessToken);
    if(!userData) {
        throw new Error();
    }

    req.user = userData;

    next();

  } catch (err) {
    // Handle the error here
    res.status(401).json({message: 'invalid token.'});
  }
};

export default authMiddleware;
