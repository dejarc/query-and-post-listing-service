import app from './api/app';
import * as dotenv from 'dotenv';
import postingAPIServer from './mock-services/posting-api-mock-server';
postingAPIServer();
dotenv.config();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
