import sharp from 'sharp';

export const imageConverter = async (fileBuffer: Buffer) => {
    try {
        const convertedFile = sharp(fileBuffer).toFormat('jpeg', { mozjpeg: true }).toBuffer();
        return convertedFile;
    } catch (err) {
        throw new Error((err as Error).message);
    }
};
