import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';

import { db } from '../../utils/databaseConnect';

import { adminUsers } from '../../schema/adminUsers';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await db.select().from(adminUsers);
        if (!users) throw Boom.badRequest();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
