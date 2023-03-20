import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const secretKey: string | undefined = process.env.TOKEN_KEY;

export const generateJWT = (id: string) => {
    const accessToken = jwt.sign({ id: id }, secretKey as string, { expiresIn: '1d' });
    return {
        accessToken,
    };
};
