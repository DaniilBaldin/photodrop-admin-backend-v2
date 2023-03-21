import { Router } from 'express';
import bodyParser from 'body-parser';

import { authMiddleware } from '../middlewares/authMiddleware';
import multer from '../middlewares/uploaderMiddleware';

import { uploadPhotos } from '../controllers/photos/uploadPhoto';

const uploadRouter = Router();
uploadRouter.use(bodyParser.json());

uploadRouter.post('/upload', authMiddleware, multer.array('file'), uploadPhotos);

export default uploadRouter;
