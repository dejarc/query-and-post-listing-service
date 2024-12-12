import * as postingIntegration from '../integration/postings';
import { createPostingService } from './create-posting-service';
describe('createPostingService', () => {
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
    it('should return success message when posting created successfully', async () => {
      const spy = jest
        .spyOn(postingIntegration, 'createPosting')
        .mockReturnValue(Promise.resolve([200]));
      const res = await createPostingService(validRequest);
      expect(spy).toHaveBeenCalledWith(validRequest.body);
      expect(res).toEqual(validRequest.body);
    });
    it('should throw error when missing properties', async () => {
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
      const spy = jest.spyOn(postingIntegration, 'createPosting');
      try {
        await createPostingService(badRequest);
      } catch (err) {
        expect(err).toEqual({
          context: ['freight.weightPounds'],
          error: 'missing one or more required properties',
          statusCode: 400,
        });
        expect(spy).not.toHaveBeenCalled();
      }
    });
  });
