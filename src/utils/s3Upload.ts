import S3, { PutObjectRequest } from 'aws-sdk/clients/s3';
import dotenv from 'dotenv';
dotenv.config();

import { v4 } from 'uuid';

const bucket = process.env.S3_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

type Params = {
    Bucket: string | undefined;
    Body: Buffer;
    Key: string;
};

export const s3Upload = async (file: Buffer, extension: string) => {
    const key = `upload/${v4()}.${extension}`;

    const params: Params = {
        Bucket: bucket,
        Body: file,
        Key: key,
    };

    await s3.putObject(params as PutObjectRequest).promise();

    const photo_url = `https://${bucket}.s3.amazonaws.com/${params.Key}`;
    return photo_url;
};
