import Router from 'express';
import bodyParser from 'body-parser';

import { authMiddleware } from '~/middlewares/authMiddleware';

import { getAllClients } from '~/controllers/clients/getAllClients';

const clientsRouter = Router();
clientsRouter.use(bodyParser.json());

clientsRouter.get('/clients', authMiddleware, getAllClients);

export default clientsRouter;
