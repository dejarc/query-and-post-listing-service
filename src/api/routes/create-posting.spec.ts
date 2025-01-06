import * as createPostingService from '../../service/create-posting-service';
import { ApiError } from '../../types/api-error';
import { TruncatedPosting } from '../../types/data-definitions';
import { createPosting } from './create-posting';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('createPosting', () => {
  const {res, mockClear} = getMockRes();
  const validPosting: TruncatedPosting = {
    companyName: 'test-company-3',
    freight: {
      weightPounds: 36600,
      equipmentType: 'Van',
      fullPartial: 'FULL',
      lengthFeet: 53,
    },
  };
  beforeEach(() => {
    mockClear();
  });
  it('should return success message when posting created successfully', async () => {
    jest
      .spyOn(createPostingService, 'createPostingService')
      .mockReturnValue(Promise.resolve(validPosting));
    const req = getMockReq({ body: validPosting });
    await createPosting(req, res);
    expect(res.send).toHaveBeenCalledWith(validPosting);
  });
  it('should send contextual error message when required properties are missing', async () => {
    const expected = new ApiError({
      message:
        'Invalid properties detected, consult context for more information.',
      statusCode: 400,
      context: ['freight.weightPounds'],
    });
    const badRequest: TruncatedPosting = {
      companyName: 'test-company-3',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 53,
      },
    };
    const req = getMockReq({ body: badRequest });
    await createPosting(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(expected);
  });
  it('should send an error message when posting service fails', async () => {
    const expected = new ApiError({
      message: 'Internal Server Error',
      statusCode: 500,
      context: [],
    });
    jest
      .spyOn(createPostingService, 'createPostingService')
      .mockReturnValue(Promise.reject(new Error('server call failed')));
    const req = getMockReq({ body: validPosting });
    await createPosting(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(expected);
  });
});
