import { Request, Response, NextFunction } from 'express';
import { Send } from 'express-serve-static-core';
import Boom from '@hapi/boom';

import { db } from '../../utils/databaseConnect';

import { adminUsers, AdminUser } from '../../schema/adminUsers';

interface TypedResponse<ResBody> extends Response {
    json: Send<ResBody, this>;
}

export const getUsers = async (_req: Request, res: TypedResponse<AdminUser[]>, next: NextFunction) => {
    try {
        const users = await db.select().from(adminUsers);

        if (!users) throw Boom.badRequest();

        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
