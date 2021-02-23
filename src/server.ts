import 'reflect-metadata'
import express from 'express';
import "./database";
import { router } from './routes';

const app = express();

app.use(express.json());
app.use( router );

app.listen(7777, () => console.log('serve is running'));
