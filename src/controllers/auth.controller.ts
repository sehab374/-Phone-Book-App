// Importing services and types
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import * as auth from '../services/auth.services';


class AuthController {
    static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await auth.register(req.body);
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            });
        } catch (e: unknown) {
            // Perform type checking or type assertion
            if (e instanceof Error) {
                next(createError(500, e.message));
            } else {
                next(createError(500, 'Unknown error occurred'));
            }
        }
    }

    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await auth.login(req.body);
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            });
        } catch (e: unknown) {
            // Perform type checking or type assertion
            if (e instanceof Error) {
                next(createError(500, e.message));
            } else {
                next(createError(500, 'Unknown error occurred'));
            }
        }
    }

    static async all(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            });
        } catch (e: unknown) {
            // Perform type checking or type assertion
            if (e instanceof Error) {
                next(createError(500, e.message));
            } else {
                next(createError(500, 'Unknown error occurred'));
            }
        }
    }
}

export default AuthController;