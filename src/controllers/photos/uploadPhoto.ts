import { Request, Response, NextFunction } from 'express';
import { Send } from 'express-serve-static-core';
import Boom from '@hapi/boom';

import { db } from '../../utils/databaseConnect';

import { imageConverter } from '../../utils/imageConverter';
import { addWatermark } from '../../utils/addWatermark';
import { makeThumbnail } from '../../utils/makeThumbnail';

interface TypedRequest<T> extends Request {
    person?: T;
}

interface TypedResponse<ResBody> extends Response {
    json: Send<ResBody, this>;
}

export const uploadPhotos = async (
    req: TypedRequest<{ name: string; albumId: number; phoneNumbers: string; type: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { albumId, name, phoneNumbers } = req.body;
        const files = req.files as Express.Multer.File[];

        files.forEach(async (file: Express.Multer.File) => {
            const type = file.originalname.split('.').reverse()[0];
            let fileBuffer = file.buffer;

            if (type === 'HEIC' || type === 'heic') {
                fileBuffer = await imageConverter(fileBuffer);
            }

            const markedFile = await addWatermark(fileBuffer);

            const originalThumbnail = await makeThumbnail(fileBuffer);
            const markedThumbnail = await makeThumbnail(markedFile);
        });

        // res.status(200).json({ data: allClients, success: true });
    } catch (err) {
        next(err);
    }
};
