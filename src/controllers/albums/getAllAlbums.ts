import { Request, Response, NextFunction } from 'express';
import { Send } from 'express-serve-static-core';
import Boom from '@hapi/boom';

import { db } from '../../utils/databaseConnect';

import { albums, Album } from '../../schema/albums';
import { eq } from 'drizzle-orm/expressions';

interface TypedRequest<T> extends Request {
    person?: T;
}

interface TypedResponse<ResBody> extends Response {
    json: Send<ResBody, this>;
}

export const getAllAlbums = async (
    req: TypedRequest<{ id: string; iat: number; exp: number }>,
    res: TypedResponse<{ data: Album[]; success: boolean }>,
    next: NextFunction
) => {
    try {
        const id = req.person?.id;
        const allAlbums = await db
            .select()
            .from(albums)
            .where(eq(albums.person_id, `${id}`));

        if (!allAlbums.length) throw Boom.badRequest('User have no albums yet!');

        res.status(200).json({ data: allAlbums, success: true });
    } catch (err) {
        next(err);
    }
};
