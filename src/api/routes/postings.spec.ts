import * as filteredPostingService from '../../service/filtered-posting-service';
import { getPostings } from './postings';
describe('getPostings', () => {
    const validRequest: any = {
      query: {
        fullPartial: 'FULL',
        equipmentType: 'Reefer',
      },
    };
    const mockPostings = [
      {
        companyName: 'test1',
        freight: {
          equipmentType: 'Van',
          fullPartial: 'PARTIAL',
          lengthFeet: 53,
          weightPounds: 6000
        }
      },
      {
        companyName: 'test2',
        freight: {
          equipmentType: 'Van',
          fullPartial: 'FULL',
          lengthFeet: 53,
          weightPounds: 40000
        }
      },
      {
        companyName: 'test3',
        freight: {
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 53,
          weightPounds: 36199,
        }
      },
    ];
    let send: any;
    let status: any;
    let res: any;
    beforeEach(() => {
      send = jest.fn();
      status = jest.fn(() => ({
        send,
      }));
      res = { send, status };
    });
    afterAll(() => {
      jest.clearAllMocks();
    });
    it('should return filtered company data', async () => {
      const expected = [mockPostings[0]];
      jest
        .spyOn(filteredPostingService, 'filteredPostingsService')
        .mockReturnValue(Promise.resolve(expected));
      await getPostings(validRequest, res);
      expect(send).toHaveBeenCalledWith(expected);
    });
    it('should return error when integration call fails', async () => {
      const expected = {
        message: 'Internal Server Error',
        statusCode: 500,
        context: [],
      };
      jest
        .spyOn(filteredPostingService, 'filteredPostingsService')
        .mockReturnValue(Promise.reject(new Error('integration call failed')));
      await getPostings(validRequest, res);
      expect(status).toHaveBeenCalledWith(500);
      expect(send).toHaveBeenCalledWith(expected);
    });
    it('should call filtered posting service with an empty object when parameters are invalid', async () => {
      const invalidRequest: any = {
        query: {
          fullPartial: [{fullPartial: 'FULL'}],
          equipmentType: [{equipmentType: 'FULL'}],
        },
      };
      const filteredPostingMock = jest
        .spyOn(filteredPostingService, 'filteredPostingsService')
        .mockReturnValue(Promise.resolve(mockPostings));
      await getPostings(invalidRequest, res);
      expect(filteredPostingMock).toHaveBeenCalledWith({});
    });
    it('should call filtered posting service with string and array fields', async () => {
      const validRequest: any = {
        query: {
          fullPartial: 'FULL',
          equipmentType: ['Van', 'Reefer'],
        },
      };
      const filteredPostingMock = jest
        .spyOn(filteredPostingService, 'filteredPostingsService')
        .mockReturnValue(Promise.resolve(mockPostings));
      await getPostings(validRequest, res);
      expect(filteredPostingMock).toHaveBeenCalledWith(validRequest.query);
    });
  });
