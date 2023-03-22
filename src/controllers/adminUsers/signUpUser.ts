import { NextFunction } from 'express';

import bcrypt from 'bcrypt';

import Boom from '@hapi/boom';
import { signUpSchema } from '~/validation/signUpValidation';

import { db } from '~/utils/databaseConnect';
import { eq } from 'drizzle-orm/expressions';

import { AdminUser, adminUsers } from '~/schema/adminUsers';
import { TypedRequestBody, TypedResponse } from '~/types/types';

export const signUpUser = async (
    req: TypedRequestBody<{ login: string; password: string }>,
    res: TypedResponse<{ message: string; success: boolean }>,
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
            const dateCreated = new Date().toISOString();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const userCheck = await db.select().from(adminUsers).where(eq(adminUsers.user, login));
            if (userCheck.length) {
                throw Boom.conflict('User already exists!');
            }

            const user: AdminUser = {
                id: 0,
                user: login,
                password: hashedPassword,
                dateCreated: dateCreated,
            };

            await db.insert(adminUsers).values(user);

            res.status(201).json({
                message: 'User created!',
                success: true,
            });
        }
    } catch (err) {
        next(err);
    }
};
