import sharp from 'sharp';

export const addWatermark = async (file: Buffer) => {
    try {
        const metadata = await sharp(file).metadata();
        const height = (metadata.height as number) * 0.41;
        const width = (metadata.width as number) * 0.51;

        const watermark = await sharp('public/PhotoDropLogo.svg')
            .resize(Math.ceil(width), Math.ceil(height), {
                fit: sharp.fit.inside,
                withoutReduction: true,
                withoutEnlargement: true,
            })
            .toFormat('png')
            .toBuffer();

        const markedFile = await sharp(file)
            .composite([
                {
                    input: watermark,
                },
            ])
            .toFormat('jpeg', { mozjpeg: true })
            .toBuffer();

        return markedFile;
    } catch (err) {
        throw new Error((err as Error).message);
    }
};
