import 'reflect-metadata'
import express from 'express';
import "./database";

const app = express();
  

app.listen(7777, () => console.log('serve is running'));
