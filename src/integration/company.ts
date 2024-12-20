import { CompanyDB } from '../mock-services/company.db';
import { Company } from '../mock-services/company.model';
const db: CompanyDB = new CompanyDB();

export function getCompanies(): Collection<Company> {
  return db.getCompanyCompanyCollection();
}

export function getCompanyById(id: string): Company {
  return db.getCompanyById(id);
}
export function getAllCompaniesById(ids: string[]): { [str: string]: string } {
  const idSet = new Set(ids);
  return db
    .getCompanyCompanyCollection()
    .where((data) => idSet.has(data.id))
    .reduce((acc, next) => {
      acc[next.id] = next.name;
      return acc;
    }, {} as { [str: string]: string });
}
