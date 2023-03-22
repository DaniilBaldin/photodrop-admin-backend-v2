import { NextFunction } from 'express';

import Boom from '@hapi/boom';

import { db } from '~/utils/databaseConnect';

import { albums, Album } from '~/schema/albums';

import { albumSchema } from '~/validation/albumValidation';
import { TypedRequestWithBody, TypedResponse } from '~/types/types';

export const createAlbum = async (
    req: TypedRequestWithBody<
        { id: string; iat: number; exp: number },
        { album_name: string; album_location: string; date: string }
    >,
    res: TypedResponse<{ data: Album; success: boolean }>,
    next: NextFunction
) => {
    try {
        const { album_name, album_location, date } = req.body;
        const { value, error } = albumSchema.validate({
            album_name: album_name,
            album_location: album_location,
            date: date,
        });
        if (error) throw Boom.badRequest(error.message);

        if (value) {
            const id = req.person?.id;
            const isoDate = new Date(date).toISOString();

            const album: Album = {
                id: 0,
                album_name: album_name,
                album_location: album_location,
                date: isoDate,
                album_logo: '',
                person_id: <string>id,
            };

            await db.insert(albums).values(album);

            res.status(201).json({
                data: album,
                success: true,
            });
        }
    } catch (err) {
        next(err);
    }
};
