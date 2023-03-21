import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';

import Boom from '@hapi/boom';

import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const secretKey: string | undefined = process.env.TOKEN_KEY;

export interface TypedRequest extends Request {
    person: string | JwtPayload;
}

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw Boom.unauthorized('Auth error! Token is missing.');
        }

        const person = jwt.verify(token, secretKey as Secret);
        (req as TypedRequest).person = person;
        next();
    } catch (err) {
        next(err);
    }
};
