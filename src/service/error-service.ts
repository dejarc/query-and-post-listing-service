import { ApiError } from '../types/api-error';
export function formatResponseError(err: ApiError): ApiError {
  if (err instanceof ApiError) {
    return err;
  }
  return new ApiError({
    message: 'Internal Server Error',
    statusCode: 500,
    context: [],
  });
}
