import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import User from '../models/user.model';
import { Socket } from 'socket.io';

// Extend Socket interface to include user property
declare module 'socket.io' {
  interface Socket {
    user: any;
  }
}

/**
 * Middleware to authenticate a socket connection based on JWT token.
 * @param socket - Socket.IO Socket instance.
 * @param next - Callback to pass control to the next middleware.
 */
export const socketValidateRequest = async (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = extractToken(socket);
    if (!token) {
      throw new Error('Authentication failed. Token not provided.');
    }

    const decodedJwt = verifyToken(token);
    const user = await findUserById(decodedJwt.userId);

    if (!user) {
      throw new Error('Authentication failed. Invalid token.');
    }

    socket.user = user;
    next();
  } catch (error: any) {
    handleSocketAuthenticationError(socket, error, next);
  }
};

/**
 * Extracts the JWT token from the socket handshake headers.
 * @param socket - Socket.IO Socket instance.
 * @returns The extracted JWT token or null.
 */
const extractToken = (socket: Socket): string | null => {
  const authorization = socket.handshake.headers.authorization;
  return authorization || null;
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
 * Handles errors during socket authentication.
 * @param socket - Socket.IO Socket instance.
 * @param error - The error object.
 * @param next - Callback to pass control to the next middleware.
 */
const handleSocketAuthenticationError = (socket: Socket, error: Error, next: (err?: Error) => void) => {
  socket.emit('error', error.message);
  next(error);
};
