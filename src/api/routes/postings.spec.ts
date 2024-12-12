import * as filteredPostingService from '../../service/filtered-posting-service';
import * as errorService from '../../service/error-service';
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
        companyName: 'test-company-1',
        freight: {
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 53,
          weightPounds: 36199,
        },
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
    it('should return filtered company data', async () => {
      const spy = jest
        .spyOn(filteredPostingService, 'filteredPostingsService')
        .mockReturnValue(Promise.resolve(mockPostings));
      await getPostings(validRequest, res);
      expect(send).toHaveBeenCalledWith(mockPostings);
    });
    it('should return error when integration call fails', async () => {
      const expected = {
        message: 'Internal Server Error',
        statusCode: 500,
        context: [],
      };
      const spy = jest
        .spyOn(filteredPostingService, 'filteredPostingsService')
        .mockReturnValue(Promise.reject(new Error('integration call failed')));
      await getPostings(validRequest, res);
      expect(status).toHaveBeenCalledWith(500);
      expect(send).toHaveBeenCalledWith(expected);
    });
  });
