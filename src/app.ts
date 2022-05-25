import express, { Request, Response } from 'express';
import cors from 'cors';
require('dotenv').config()

import routes from './routes'

const app = express()
const port = 7650

app.use(express.json());
app.use(cors())
app.use('/api', routes);

console.log('Introducing Changes....')

app.listen(port, () => {
    console.log(`App running on ${port}`);
})