import { Router } from 'express';

import { getUsers } from '~/controllers/adminUsers/getUsers';
import { signUpUser } from '~/controllers/adminUsers/signUpUser';
import { loginUser } from '~/controllers/adminUsers/loginUser';

const adminRouter = Router();

adminRouter.get('/users', getUsers);
adminRouter.post('/create', signUpUser);
adminRouter.post('/login', loginUser);

export default adminRouter;
