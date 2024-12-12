import express, { Express } from 'express';
import router from './routes/routes';
import logger from 'morgan';
const app: Express = express();
app.use(logger('dev'));
app.use(express.json());
app.use('/', router);
export default app;
