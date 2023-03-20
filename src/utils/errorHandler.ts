import { ErrorRequestHandler } from 'express';
import { Boom } from '@hapi/boom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    if (error instanceof Boom) {
        return res.status(error.output.statusCode).json({ message: error.message, success: false });
    }

    console.error(`Error: ${error.message}`);

    return res.status(500).json({ message: error.message, success: false });
};
