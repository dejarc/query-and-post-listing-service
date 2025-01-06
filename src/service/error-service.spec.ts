import { ApiError } from '../types/api-error';
import { formatResponseError } from './error-service';
describe('formatResponseError', () => {
  it('should return custom error', () => {
    const customError = new ApiError({
      message: 'missing one or more required properties',
      statusCode: 400,
      context: ['freight.equipmentType'],
    });
    const result = formatResponseError(customError);
    expect(result).toEqual(customError);
  });
  it('should return generic error', () => {
    const genericError = new ApiError({
      message: 'Internal Server Error',
      statusCode: 500,
      context: [],
    });
    const result = formatResponseError(new Error('integration error') as any);
    expect(result).toEqual(genericError);
  });
});
