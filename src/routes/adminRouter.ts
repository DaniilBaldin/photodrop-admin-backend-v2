import { Router } from 'express';

import { getUsers } from '../controllers/adminUsers/getUsers';
import { createUser } from '../controllers/adminUsers/createUser';

const adminRouter = Router();

adminRouter.get('/users', getUsers);
adminRouter.post('/create', createUser);

export default adminRouter;
