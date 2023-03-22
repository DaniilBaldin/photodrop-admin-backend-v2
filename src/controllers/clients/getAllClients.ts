import { NextFunction } from 'express';

import Boom from '@hapi/boom';

import { db } from '~/utils/databaseConnect';

import { clients, Client } from '~/schema/clients';
import { TypedRequest, TypedResponse } from '~/types/types';

export const getAllClients = async (
    _req: TypedRequest<{ id: string; iat: number; exp: number }>,
    res: TypedResponse<{ data: Client[]; success: boolean }>,
    next: NextFunction
) => {
    try {
        const allClients = await db.select().from(clients);

        if (!allClients.length) throw Boom.badRequest('No clients yet!');

        res.status(200).json({ data: allClients, success: true });
    } catch (err) {
        next(err);
    }
};
