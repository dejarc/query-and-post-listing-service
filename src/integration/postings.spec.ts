import { getPostings, createPosting } from './postings';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
describe('postings-integration', () => {
  const mockData = {
    postings: [
      {
        companyName: 'ACCELERATE SHIPPING',
        freight: {
          weightPounds: 6000,
          equipmentType: 'Van',
          fullPartial: 'PARTIAL',
          lengthFeet: 53,
        },
      },
      {
        companyName: 'EXPERT SHIPPING',
        freight: {
          weightPounds: 40000,
          equipmentType: 'Van',
          fullPartial: 'FULL',
          lengthFeet: 53,
        },
      },
      {
        companyName: 'TRUE SHIPPING',
        freight: {
          weightPounds: 36199,
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 53,
        },
      },
    ],
  };
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('getPostings', () => {
    it('should return postings', async () => {
      const mock = new MockAdapter(axios);
      mock.onGet('/postings').reply(200, mockData);
      const res = await getPostings();
      expect(res).toEqual(mockData.postings);
    });
  });
  describe('createPosting', () => {
    it('should return success response for posting', async () => {
      const mock = new MockAdapter(axios);
      mock.onPost('/posting').reply(() => {
        return [200];
      });
      const validRequest: any = {
        body: {
          companyName: 'test-company-3',
          freight: {
            weightPounds: 36600,
            equipmentType: 'Van',
            fullPartial: 'FULL',
            lengthFeet: 53,
          },
        },
      };
      const res = await createPosting(validRequest);
      expect(res).toEqual(undefined);
    });
  });
});
