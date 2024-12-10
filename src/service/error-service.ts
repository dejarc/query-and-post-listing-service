import { ApiError } from '../types/data-definitions';

export function formatResponseError(err: ApiError): ApiError {
  if (err.statusCode) {
    // custom error thrown by service
    return err;
  }
  return {
    message: 'Internal Server Error',
    statusCode: 500,
    context: [],
  };
}
