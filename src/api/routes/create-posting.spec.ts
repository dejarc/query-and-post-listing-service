import * as createPostingService from '../../service/create-posting-service';
import { createPosting } from './create-posting';
describe('createPosting', () => {
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
    it('should return success message when posting created successfully', async () => {
      jest
        .spyOn(createPostingService, 'createPostingService')
        .mockReturnValue(Promise.resolve(validRequest.body));
      await createPosting(validRequest, res);
      expect(send).toHaveBeenCalledWith(validRequest.body);
    });
    it('should send contextual error message when required properties are missing', async () => {
      const expected = {
        message: 'Invalid properties detected, consult context for more information.',
        statusCode: 400,
        context: ['freight.weightPounds'],
      };
      const badRequest: any = {
        body: {
          companyName: 'test-company-3',
          freight: {
            equipmentType: 'Van',
            fullPartial: 'FULL',
            lengthFeet: 53,
          },
        },
      };
      await createPosting(badRequest, res);
      expect(status).toHaveBeenCalledWith(400);
      expect(send).toHaveBeenCalledWith(expected);
    });
    it('should send an error message when posting service fails', async () => {
      const expected = {
        message: 'Internal Server Error',
        statusCode: 500,
        context: [],
      };
      jest
        .spyOn(createPostingService, 'createPostingService')
        .mockReturnValue(Promise.reject(new Error('server call failed')));
      await createPosting(validRequest, res);
      expect(status).toHaveBeenCalledWith(500);
      expect(send).toHaveBeenCalledWith(expected);
    });
  });
