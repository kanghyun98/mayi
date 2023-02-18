import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UnauthorizedError } from '@errors/customErrors';
import User from '@database/entities/user';

dotenv.config();

/**
 * jwt를 decode하여 유저의 id값 반환하는 함수
 *
 * @param token 로그인하여 받아온 jwt
 * @returns 유저의 id값
 */
export const jwtVerify = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    return decoded.id;
  } catch (error) {
    throw new UnauthorizedError('유효하지 않은 JWT 토큰입니다.');
  }
};

/**
 * jwt 생성하는 함수
 *
 * @param userData 유저 데이터
 * @returns 유저 데이터로 생성된 jwt
 */
export const makeJWTToken = (userData: User) => {
  const token = jwt.sign(userData, process.env.JWT_SECRET!);
  return token;
};
