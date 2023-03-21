import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import adminRouter from './routes/adminRouter';
import albumRouter from './routes/albumRouter';

import { errorHandler } from './utils/errorHandler';

dotenv.config();

const { PORT } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, '../', '/public')));

app.use(bodyParser.json());

app.use(
    cors({
        origin: '*',
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with', 'Access-Control-Allow-Origin'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello there! General Kenobi!');
});

app.use('/', adminRouter, albumRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
