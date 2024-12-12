import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import postingAPIServer from './posting-api/posting-api-mock-server';
import router from './routes/routes';
import logger from 'morgan';

// Start the mock Posting API server
postingAPIServer();
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use('/', router);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
