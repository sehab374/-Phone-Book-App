import express, { Application } from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import route from './routes';
import bodyParser from 'body-parser';
import multer from 'multer';

const app: Application = express();
const prisma = new PrismaClient();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// redirect to routes/index.ts
app.use('/', route);

const port: number = parseInt(process.env.PORT as string, 10) || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
