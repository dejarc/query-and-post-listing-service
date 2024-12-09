import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import postingAPIServer from "./posting-api/posting-api-mock-server";
import { CompanyDB } from "./db/company.db";
import { Company } from "./db/company.model";

// Start the mock Posting API server
postingAPIServer();
dotenv.config();

const db: CompanyDB = new CompanyDB();const app: Express = express();
const port = process.env.PORT || 3000;
const companyCollection: Collection<Company> = db.getCompanyCompanyCollection();

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Please view the README.md file for challenge instructions. Thanks!"
  );
});

app.get("/companies", async (req: Request, res: Response) => {
  const companies: Company[] = await companyCollection.find({});
  res.send(companies);
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
