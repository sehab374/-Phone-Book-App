import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;

// Define the payload type according to your needs
interface Payload {
  [key: string]: any;
}

export const authUtils = {
  signAccessToken: (payload: Payload): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!accessTokenSecret) {
        reject(createError.InternalServerError('Missing access token secret'));
        return;
      }

      jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
          return;
        }
        if (token) {
          resolve(token);
        } else {
          reject(createError.InternalServerError('Token generation failed'));
        }
      });
    });
  },
  verifyAccessToken: (token: string): Promise<Payload> => {
    return new Promise((resolve, reject) => {
      if (!accessTokenSecret) {
        reject(createError.InternalServerError('Missing access token secret'));
        return;
      }

      jwt.verify(token, accessTokenSecret, (err, payload) => {
        if (err) {
          const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          reject(createError.Unauthorized(message));
          return;
        }
        resolve(payload as Payload);
      });
    });
  },
};

export function signAccessToken(user: { id: number; fullName: string; password: string; number: string; email: string; }) {
    throw new Error('Function not implemented.');
}
export function verifyAccessToken(token: string) {
    throw new Error('Function not implemented.');
}

