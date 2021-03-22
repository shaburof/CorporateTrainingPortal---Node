console.clear();
console.log('------------------------------------')

import { pool } from './models/pool';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import { MainController } from './controllers/mainController';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', './src/views/');
app.use(express.static('public'));

app.use(router);

app.use(MainController.errorHandler);

app.listen(PORT, async () => {
    await pool.sync();
    console.log(`Listen port:${PORT}...`);
});
