import { Request, Response, NextFunction } from 'express';
import { Send } from 'express-serve-static-core';
import bcrypt from 'bcrypt';

import Boom from '@hapi/boom';
import { signUpSchema } from '../../validation/signUpValidation';

import { db } from '../../utils/databaseConnect';
import { eq } from 'drizzle-orm/expressions';

import { adminUsers } from '../../schema/adminUsers';

import { generateJWT } from '../../utils/generateJWT';

interface TypedRequestBody<T> extends Request {
    body: T;
}

interface TypedResponse<ResBody> extends Response {
    json: Send<ResBody, this>;
}

export const loginUser = async (
    req: TypedRequestBody<{ login: string; password: string }>,
    res: TypedResponse<{
        token: {
            accessToken: string;
        };
        success: boolean;
        user: {
            id: number;
            login: string;
        };
    }>,
    next: NextFunction
) => {
    try {
        const { login, password } = req.body;
        const { value, error } = signUpSchema.validate({
            login: login,
            password: password,
        });
        if (error) throw Boom.badRequest(error.message);

        if (value) {
            const userCheck = await db.select().from(adminUsers).where(eq(adminUsers.user, login));
            if (!userCheck.length) {
                throw Boom.unauthorized('User does not exists!');
            }

            const passwordCheck = await bcrypt.compare(password, userCheck[0].password);
            if (!passwordCheck) throw Boom.unauthorized('Password is not correct!');

            const token = generateJWT(userCheck[0].id.toString());

            res.status(201).json({
                token,
                success: true,
                user: {
                    id: userCheck[0].id,
                    login: userCheck[0].user,
                },
            });
        }
    } catch (err) {
        next(err);
    }
};
