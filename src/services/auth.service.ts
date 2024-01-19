import { Request, Response, NextFunction } from 'express';
import User, { TYPE_GUEST } from '../models/user.model';
import { getHeaderValue } from '../utils/helpers';
import { signToken } from '../utils/token'; 
import { sendApiError, sendApiResponse } from '../helpers/response';

export class AuthService {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, type, udid, deviceToken } = req.body;
      const headers = this.extractHeaders(req);

      if (type === TYPE_GUEST) {
        const user = await this.handleGuestLogin(udid, deviceToken, headers);
        const token = signToken({ userId: user._id, type, udid });
        return sendApiResponse(res, { id: user._id, accessToken: token });
      }

      return sendApiError(res, "This function not active. Please try again.");
    } catch (error: any) {
      return sendApiError(res, `Error: ${error.message}`);
    }
  }

  private static extractHeaders(req: Request) {
    return {
      platform: getHeaderValue(req.headers, 'platform'),
      region: getHeaderValue(req.headers, 'region'),
      appId: getHeaderValue(req.headers, 'appid'),
      osVersion: getHeaderValue(req.headers, 'osversion'),
      appVersion: getHeaderValue(req.headers, 'appversion')
    };
  }

  private static async handleGuestLogin(udid: string, deviceToken: string, headers: any) {
    const existingUser = await User.getUser(udid);
    if (!existingUser) {
      return await User.createGuest(udid, headers.platform, headers.region, headers.appId, headers.osVersion, headers.appVersion, deviceToken);
    }
    return existingUser;
  }
}
