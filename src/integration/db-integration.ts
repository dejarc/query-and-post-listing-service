import { CompanyDB } from '../db/company.db';
import { Company } from '../db/company.model';
const db: CompanyDB = new CompanyDB();

export function getCompanies(): Collection<Company> {
  return db.getCompanyCompanyCollection();
}

export function getCompanyById(id: string): Company {
  return db.getCompanyById(id);
}
