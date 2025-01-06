import * as filteredPostingService from '../../service/filtered-posting-service';
import { getPostings } from './postings';
import { getMockReq, getMockRes } from '@jest-mock/express';
describe('getPostings', () => {
  const { res, mockClear } = getMockRes();
  const validQuery = {
    fullPartial: 'FULL',
    equipmentType: 'Reefer',
  };

  const mockPostings = [
    {
      companyName: 'test1',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'PARTIAL',
        lengthFeet: 53,
        weightPounds: 6000,
      },
    },
    {
      companyName: 'test2',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 40000,
      },
    },
    {
      companyName: 'test3',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 53,
        weightPounds: 36199,
      },
    },
  ];
  beforeEach(() => {
    mockClear();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return filtered company data', async () => {
    const expected = [mockPostings[0]];
    jest
      .spyOn(filteredPostingService, 'filteredPostingsService')
      .mockReturnValue(Promise.resolve(expected));
    const req = getMockReq({ query: validQuery });
    await getPostings(req, res);
    expect(res.send).toHaveBeenCalledWith(expected);
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
    const req = getMockReq({ query: validQuery });
    await getPostings(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(expected);
  });
  it('should call filtered posting service with an empty object when parameters are invalid', async () => {
    const invalidQuery = {
      fullPartial: [{ fullPartial: 'FULL' }],
      equipmentType: [{ equipmentType: 'FULL' }],
    }
    const filteredPostingMock = jest
      .spyOn(filteredPostingService, 'filteredPostingsService')
      .mockReturnValue(Promise.resolve(mockPostings));
    const req = getMockReq({query: invalidQuery});
    await getPostings(req, res);
    expect(filteredPostingMock).toHaveBeenCalledWith({});
  });
  it('should call filtered posting service with string and array fields', async () => {
    const validQuery = {
      fullPartial: 'FULL',
      equipmentType: ['Van', 'Reefer'],
    };
    const filteredPostingMock = jest
      .spyOn(filteredPostingService, 'filteredPostingsService')
      .mockReturnValue(Promise.resolve(mockPostings));
    const req = getMockReq({query: validQuery});
    await getPostings(req, res);
    expect(filteredPostingMock).toHaveBeenCalledWith(validQuery);
  });
});
