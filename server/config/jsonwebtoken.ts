import { sign } from 'jsonwebtoken';
import { vars } from './app';

export const signFunc = (data) => {
  return new Promise((res, rej) => {
    sign(
      data,
      vars.SECRET,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) return rej(err);
        return res(token);
      },
    );
  });
};
