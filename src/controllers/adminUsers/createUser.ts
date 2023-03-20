import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';
import { like, eq } from 'drizzle-orm/expressions';

import bcrypt from 'bcrypt';

import { db } from '../../utils/databaseConnect';

import { adminUsers } from '../../schema/adminUsers';

type User = {
    user: string;
    password: string;
    dateCreated: string;
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { login, password } = req.body;
        const dateCreated = new Date().toISOString();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const userCheck = await db.select().from(adminUsers).where(eq(adminUsers.user, login));
        if (userCheck.length) {
            throw Boom.conflict('User already exists!');
        }

        const user: User = {
            user: login,
            password: hashedPassword,
            dateCreated: dateCreated,
        };

        await db.insert(adminUsers).values(user);

        res.status(201).json({
            message: 'User created!',
            success: true,
        });
    } catch (err) {
        next(err);
    }
};
