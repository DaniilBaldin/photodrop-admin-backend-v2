/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, Response } from 'express';
import { Send } from 'express-serve-static-core';
import { Boom } from '@hapi/boom';

interface TypedResponse<ResBody> extends Response {
    json: Send<ResBody, this>;
}

export const errorHandler: ErrorRequestHandler = (
    error,
    _req,
    res: TypedResponse<{ message: string; success: boolean }>,
    _next
) => {
    if (error instanceof Boom) {
        return res.status(error.output.statusCode).json({ message: error.message, success: false });
    }

    console.error(`Error: ${error.message}`);

    return res.status(500).json({ message: error.message, success: false });
};
