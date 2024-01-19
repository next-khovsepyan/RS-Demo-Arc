import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { JWT_SECRET } from '../config';
import { sendApiError } from '../helpers/response';

/**
 * Middleware to authenticate user based on JWT token.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return sendApiError(res, "Authentication failed. Token not provided.", 401);
    }

    const decodedUserJWT = verifyToken(token);
    const user = await findUserById(decodedUserJWT.userId);

    if (!user) {
      return sendApiError(res, "Authentication failed. User not found.", 401);
    }

    //@ts-ignore
    req.user = user;
    next();
  } catch (error: any) {
    handleAuthenticationError(error, res);
  }
};

/**
 * Extracts the JWT token from the request headers.
 * @param req - Express Request object.
 * @returns The extracted JWT token or null.
 */
const extractToken = (req: Request): string | null => {
  const authHeader = req.header('Authorization');
  return authHeader?.replace('Bearer ', '') || null;
};

/**
 * Verifies the JWT token.
 * @param token - JWT token to verify.
 * @returns Decoded JWT payload.
 */
const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};

/**
 * Finds a user by ID.
 * @param userId - The user ID to find.
 * @returns The found User or null.
 */
const findUserById = async (userId: string) => {
  return await User.findOne({ _id: userId });
};

/**
 * Handles authentication errors.
 * @param error - The error object.
 * @param res - Express Response object.
 */
const handleAuthenticationError = (error: Error, res: Response) => {
  // Additional error handling logic can be added here
  return sendApiError(res, "Authentication failed. Invalid token.", 401);
};
