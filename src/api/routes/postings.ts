import { Request, Response } from 'express';
import { filteredPostingsService } from '../../service/filtered-posting-service';
import { ApiError } from '../../types/api-error';
import { formatResponseError } from '../../service/error-service';
import { getFilteredParams } from '../../service/filter-query-params-service';
export async function getPostings(req: Request, res: Response) {
  try {
    const params = getFilteredParams(req.query);
    const postings = await filteredPostingsService(params);
    res.send(postings);
  } catch (err) {
    const apiError = formatResponseError(err as ApiError);
    res.status(apiError.statusCode).send(apiError);
  }
}
