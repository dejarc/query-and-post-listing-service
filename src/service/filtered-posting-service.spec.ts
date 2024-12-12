import * as postingIntegration from '../integration/postings-integration';
import { filteredPostingsService } from './filtered-posting-service';
describe('createPostingService', () => {
    const postingResponse = [
      {
        id: 'LS4XqHsB',
        companyId: '1',
        freight: {
          equipmentType: 'Van',
          fullPartial: 'PARTIAL',
          lengthFeet: 53,
          weightPounds: 6000,
          comments: [
            {
              comment: 'Email MC',
            },
          ],
        },
        lane: {
          origin: {
            placeId: 9884,
            location: {
              lat: 41.9125,
              lon: -88.13472,
            },
            city: 'Carol Stream',
            county: 'DuPage',
            postalCode: '60116',
            stateProv: 'IL',
          },
          destination: {
            placeId: 44977,
            location: {
              lat: 45.39444,
              lon: -92.14222,
            },
            city: 'Turtle Lake',
            county: 'Barron',
            postalCode: '54889',
            stateProv: 'WI',
          },
        },
      },
      {
        id: 'ZS01kawe',
        companyId: '6',
        freight: {
          equipmentType: 'Van',
          fullPartial: 'FULL',
          lengthFeet: 53,
          weightPounds: 40000,
          comments: [
            {
              comment: 'Call ext 3024 or email 3024@example.com (we need REF# and MC# in ema',
            },
            {
              comment: 'il)',
            },
          ],
        },
        lane: {
          origin: {
            placeId: 9927,
            location: {
              lat: 41.85,
              lon: -87.65,
            },
            city: 'Chicago',
            county: 'Cook',
            postalCode: '60601',
            stateProv: 'IL',
          },
          destination: {
            placeId: 14139,
            location: {
              lat: 38.25417,
              lon: -85.75944,
            },
            city: 'Louisville',
            county: 'Jefferson',
            postalCode: '40201',
            stateProv: 'KY',
          },
        },
      },
      {
        id: 'ZS01kZMx',
        companyId: '24',
        freight: {
          equipmentType: 'Reefer',
          fullPartial: 'FULL',
          lengthFeet: 53,
          weightPounds: 36199,
          comments: [
            {
              comment: 'Call 555-123-4567.  Post ID: 9118240',
            },
          ],
        },
        lane: {
          origin: {
            placeId: 9927,
            location: {
              lat: 41.85,
              lon: -87.65,
            },
            city: 'Chicago',
            county: 'Cook',
            postalCode: '60601',
            stateProv: 'IL',
          },
          destination: {
            placeId: 17820,
            location: {
              lat: 42.33139,
              lon: -83.04583,
            },
            city: 'Detroit',
            county: 'Wayne',
            postalCode: '48201',
            stateProv: 'MI',
          },
        },
      },
    ];
    beforeAll(() => {
      jest
        .spyOn(postingIntegration, 'getPostings')
        .mockReturnValue(Promise.resolve(postingResponse));
    });
    it('should not filter the results when query parameters are omitted', async () => {
      const validRequest: any = {
        query: {},
      };
      const expected = [
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
      ];
      const res = await filteredPostingsService(validRequest);
      expect(res).toEqual(expected);
    });
    it('should filter results based on "fullPartial" only', async () => {
      const validRequest: any = {
        query: {
          fullPartial: 'PARTIAL',
        },
      };
      const expected = [
        {
          companyName: 'ACCELERATE SHIPPING',
          freight: {
            weightPounds: 6000,
            equipmentType: 'Van',
            fullPartial: 'PARTIAL',
            lengthFeet: 53,
          },
        },
      ];
      const res = await filteredPostingsService(validRequest);
      expect(res).toEqual(expected);
    });
    it('should filter results based on "equipmentType" only', async () => {
      const validRequest: any = {
        query: {
          equipmentType: 'Reefer',
        },
      };
      const expected = [
        {
          companyName: 'TRUE SHIPPING',
          freight: {
            weightPounds: 36199,
            equipmentType: 'Reefer',
            fullPartial: 'FULL',
            lengthFeet: 53,
          },
        },
      ];
      const res = await filteredPostingsService(validRequest);
      expect(res).toEqual(expected);
    });
    it('should filter results based on "fullPartial" and "equipmentType"', async () => {
      const validRequest: any = {
        query: {
          fullPartial: 'FULL',
          equipmentType: 'Van',
        },
      };
      const expected = [
        {
          companyName: 'EXPERT SHIPPING',
          freight: {
            weightPounds: 40000,
            equipmentType: 'Van',
            fullPartial: 'FULL',
            lengthFeet: 53,
          },
        },
      ];
      const res = await filteredPostingsService(validRequest);
      expect(res).toEqual(expected);
    });
  });
