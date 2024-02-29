import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import * as jwt from '../utils/jwt'; // Make sure this path is correct and jwt utility is properly typed
import createError from 'http-errors';

dotenv.config();

const prisma = new PrismaClient();

interface RegisterData {
    fullNAme: string;
    number: string;
  email: string;
  password: string;
  confirmPassword: string;
//   [key: string]: any; // Add additional fields as needed
}

interface UserData extends RegisterData {
  id?: number; // Assuming an id field is present
}

class AuthService {
  static async register(data: RegisterData): Promise<UserData> {
    const { email } = data;
    data.password = bcrypt.hashSync(data.password, 8);
    let user = await prisma.user.create({
      data,
    });
    const accessToken = await jwt.signAccessToken(user);
    return { ...user, accessToken };
  }

  static async login(data: { email: string; password: string }): Promise<UserData> {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw createError.NotFound('User not registered');
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) throw createError.Unauthorized('Email address or password not valid');

    const accessToken = await jwt.signAccessToken(user);
    delete user.password;
    return { ...user, accessToken };
  }

  static async all(): Promise<UserData[]> {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
}

export default AuthService;

export function register(body: any) {
    throw new Error('Function not implemented.');
}


export function login(body: any) {
    throw new Error('Function not implemented.');
}


export function all() {
    throw new Error('Function not implemented.');
}
