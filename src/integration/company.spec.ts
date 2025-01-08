import { getCompanies, getCompanyById, getAllCompaniesById } from './company';
import { CompanyDB } from '../mock-services/company.db';
import loki from 'lokijs';
import { Company } from '../mock-services/company.model';
describe('db-integration', () => {
  const mockData = [
    { id: '1', name: 'ACCELERATE SHIPPING' },
    { id: '2', name: 'BARTER SHIPPING' },
    { id: '3', name: 'BLINK SHIPPING' },
    { id: '4', name: 'COMMAND SHIPPING' },
    { id: '5', name: 'CORE SHIPPING' },
    { id: '6', name: 'EXPERT SHIPPING' },
    { id: '7', name: 'EXPRESS SHIPPING' },
  ];
  const db = new loki('companies.db');
  const companies = db.addCollection<Company>('companies');
  mockData.forEach((company) => {
    companies.insert(company);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('getCompanies', () => {
    it('should return a list of all companies', () => {
      jest
        .spyOn(CompanyDB.prototype, 'getCompanyCompanyCollection')
        .mockImplementation(() => {
          return companies;
        });
      const res = getCompanies();
      expect(res).toEqual(companies);
    });
  });
  describe('getCompanyById', () => {
    it('should return a single company', () => {
      const id = '1';
      const mockEntry = companies.findOne({ id });
      jest
        .spyOn(CompanyDB.prototype, 'getCompanyById')
        .mockImplementation((id: string) => {
          return companies.findOne({ id }) as Company;
        });
      const res = getCompanyById(id);
      expect(res).toEqual(mockEntry);
    });
  });
  describe('getAllCompaniesById', () => {
    it('should return a map of company ids to names', () => {
      const mockData = {
        '2': 'BARTER SHIPPING',
        '3': 'BLINK SHIPPING',
        '4': 'COMMAND SHIPPING',
      };
      jest
        .spyOn(CompanyDB.prototype, 'getCompanyCompanyCollection')
        .mockImplementation(() => {
          return companies;
        });
      const res = getAllCompaniesById(['2', '3', '4']);
      expect(res).toEqual(mockData);
    });
  });
});
