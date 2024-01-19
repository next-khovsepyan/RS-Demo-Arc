import jwt from 'jsonwebtoken';
import { JWT_EXPIRE, JWT_SECRET } from '../config';

const secretKey = JWT_SECRET;

export interface TokenPayload {
  userId: string;
  type: string,
  udid: string
}

export function signToken(payload: TokenPayload): string {
  const options: jwt.SignOptions = { 
    expiresIn: JWT_EXPIRE
   };
  const token = jwt.sign(payload, secretKey, options);
  return token;
}