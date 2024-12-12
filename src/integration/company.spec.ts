import { getCompanies, getCompanyById } from './company';
import { CompanyDB } from '../mock-services/company.db';
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
  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('getCompanies', () => {
    it('should return a list of all companies', () => {
      jest
        .spyOn(CompanyDB.prototype, 'getCompanyCompanyCollection')
        .mockImplementation(() => {
          return mockData as any;
        });
      const res = getCompanies();
      expect(res).toEqual(mockData);
    });
  });
  describe('getCompanyById', () => {
    it('should return a single company', () => {
      const mockEntry = mockData[0];
      jest
        .spyOn(CompanyDB.prototype, 'getCompanyById')
        .mockImplementation(() => {
          return mockEntry as any;
        });
      const res = getCompanyById('1');
      expect(res).toEqual(mockEntry);
    });
  });
});
