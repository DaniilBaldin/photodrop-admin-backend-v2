import Router from 'express';
import bodyParser from 'body-parser';

import { authMiddleware } from '~/middlewares/authMiddleware';

import { getAllAlbums } from '~/controllers/albums/getAllAlbums';
import { getAlbumById } from '~/controllers/albums/getAlbumById';
import { createAlbum } from '~/controllers/albums/createAlbum';

const albumRouter = Router();
albumRouter.use(bodyParser.json());

albumRouter.get('/albums', authMiddleware, getAllAlbums);
albumRouter.get('/album/:id', authMiddleware, getAlbumById);
albumRouter.post('/album', authMiddleware, createAlbum);

export default albumRouter;
