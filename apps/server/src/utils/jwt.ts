import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

export const signToken = (payload: object, expiresIn = 7) => {
    const options: SignOptions = { expiresIn };
    
    jwt.sign(payload, JWT_SECRET, options);
}

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);