import { Request, Response, NextFunction } from 'express';
import { sendApiError, sendApiResponse } from '../../helpers/response';
import User, { TYPE_ADMIN } from '../../models/user.model';
import { signToken } from '../../utils/token';
const bcrypt = require('bcrypt');


export class AuthService {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email, type: TYPE_ADMIN });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return sendApiError(res, "Invalid email or password.", 400)
      }
     
      const token = signToken({ userId: user._id,type: user.type, udid: user.udid });

      return sendApiResponse(res, {
        id: user._id,
        accessToken: token
      })
    } catch (error: any) {
      return sendApiError(res, `Error: ${error.message}`)
    }
  }
}
