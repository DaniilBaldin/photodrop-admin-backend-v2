import sharp from 'sharp';

export const makeThumbnail = async (file: Buffer) => {
    try {
        const metadata = await sharp(file).metadata();
        const height = (metadata.height as number) * 0.25;
        const width = (metadata.width as number) * 0.25;

        const resizedFile = sharp(file).resize(Math.ceil(width), Math.ceil(height)).toFormat('jpeg').toBuffer();

        return resizedFile;
    } catch (err) {
        throw new Error((err as Error).message);
    }
};
