import { Request, Response } from 'express';
import User from '../models/user.model';
import { sendApiError, sendApiResponse } from '../helpers/response';
import logger from '../utils/logger';

export class UserService {
  static async registerPushNotificationToken(req: Request, res: Response) {
    const { deviceToken } = req.body;
    //@ts-ignore
    const userId = req.user?.id;

    if (!userId) {
      return sendApiError(res, 'Unauthorized access.', 401);
    }

    try {
      const user = await User.findById(userId);

      if (!user) {
        return sendApiError(res, 'User not found.', 404);
      }

      user.deviceToken = deviceToken;
      await user.save();

      return sendApiResponse(res, {}, true, 'Push notification token registered successfully.');
    } catch (error: any) {
      logger.error(`Error registering push notification token: ${error.message}`);
      return sendApiError(res, 'Server error.', 500);
    }
  }
}
