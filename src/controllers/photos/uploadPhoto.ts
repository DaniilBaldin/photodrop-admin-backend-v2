import { NextFunction } from 'express';

import Boom from '@hapi/boom';

import { db } from '~/utils/databaseConnect';

import { imageConverter } from '~/utils/imageConverter';
import { addWatermark } from '~/utils/addWatermark';
import { makeThumbnail } from '~/utils/makeThumbnail';
import { s3Upload } from '~/utils/s3Upload';

import { Photo, photos } from '~/schema/photos';

import { photoUploadSchema } from '~/validation/photoUploadSchema';
import { TypedRequest, TypedResponse } from '~/types/types';

export const uploadPhotos = async (
    req: TypedRequest<{ name: string; albumId: number; phoneNumbers: string; type: string }>,
    res: TypedResponse<{ message: string; success: boolean }>,
    next: NextFunction
) => {
    try {
        const { albumId, phoneNumbers, type } = req.body;
        const { value, error } = photoUploadSchema.validate({
            albumId: albumId,
            phoneNumbers: phoneNumbers,
            type: type,
        });

        if (error) throw Boom.badRequest(error.message);

        if (value) {
            const files = req.files as Express.Multer.File[];

            files.forEach(async (file: Express.Multer.File) => {
                let type = file.originalname.split('.').reverse()[0];
                let fileBuffer = file.buffer;

                if (type === 'HEIC' || type === 'heic') {
                    fileBuffer = await imageConverter(fileBuffer);
                    type = 'jpeg';
                }

                const markedFile = await addWatermark(fileBuffer);

                const originalThumbnail = await makeThumbnail(fileBuffer);
                const markedThumbnail = await makeThumbnail(markedFile);

                const originalFileUrl = await s3Upload(fileBuffer, type);
                const markedFileUrl = await s3Upload(markedFile, type);
                const originalThumbnailUrl = await s3Upload(originalThumbnail, type);
                const markedThumbnailUrl = await s3Upload(markedThumbnail, type);

                if (!originalFileUrl || !markedFileUrl || !originalThumbnailUrl || !markedThumbnailUrl) {
                    throw Boom.badImplementation('Something went wrong! Upload not successfull!');
                }

                const photo: Photo = {
                    id: 0,
                    photo_logo: originalThumbnailUrl,
                    client_name: phoneNumbers,
                    photo_url: originalFileUrl,
                    album_id: albumId,
                    marked_url: markedFileUrl,
                    marked_logo: markedThumbnailUrl,
                };

                await db.insert(photos).values(photo);
            });
            res.status(200).json({ message: 'Files uploaded!', success: true });
        }
    } catch (err) {
        next(err);
    }
};
