import * as postingIntegration from '../integration/postings';
import { TruncatedPosting } from '../types/data-definitions';
import { createPostingService } from './create-posting-service';
describe('createPostingService', () => {
    const posting: any = {
      companyName: 'test-company-3',
      freight: {
        weightPounds: 36600,
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
      },
    };
    afterAll(() => {
      jest.clearAllMocks();
    });
    it('should return success message when posting created successfully', async () => {
      const spy = jest
        .spyOn(postingIntegration, 'createPosting')
        .mockReturnValue(Promise.resolve());
      const res = await createPostingService(posting);
      expect(spy).toHaveBeenCalledWith(posting);
      expect(res).toEqual(posting);
    });
  });
