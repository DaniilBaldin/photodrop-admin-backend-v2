import { NextFunction } from 'express';

import Boom from '@hapi/boom';

import { db } from '~/utils/databaseConnect';

import { Album, albums } from '~/schema/albums';

import { and, eq, like } from 'drizzle-orm/expressions';

import { paramsIdSchema } from '~/validation/albumValidation';
import { TypedRequest, TypedResponse } from '~/types/types';

export const getAlbumById = async (
    req: TypedRequest<{ id: string; iat: number; exp: number }>,
    res: TypedResponse<{ data: Album; success: boolean }>,
    next: NextFunction
) => {
    try {
        const albumId = req.params.id;
        const { value, error } = paramsIdSchema.validate({
            id: albumId,
        });
        if (error) throw Boom.badRequest('Invalid album id parameter!');

        if (value) {
            const userId = req.person?.id;
            const userAlbum = await db
                .select()
                .from(albums)
                .where(and(eq(albums.person_id, `${userId}`), like(albums.id, `${albumId}`)));

            if (!userAlbum.length) throw Boom.badRequest('Album does not exists!');

            res.status(200).json({
                data: userAlbum[0],
                success: true,
            });
        }
    } catch (err) {
        next(err);
    }
};
