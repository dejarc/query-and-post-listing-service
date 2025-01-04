import { Request, Response } from 'express';
import { filteredPostingsService } from '../../service/filtered-posting-service';
import { ApiError, FilteredQuery } from '../../types/data-definitions';
import { formatResponseError } from '../../service/error-service';
import { ParsedQs } from 'qs';
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
function getFilteredParams(query: ParsedQs): FilteredQuery {
  return Object.keys(query).reduce((acc, next) => {
    if (typeof query[next] === 'string') {
      acc[next] = query[next] as string;
    } else if (
      Array.isArray(query[next]) &&
      (query[next] as Array<string>).every((entry) => typeof entry === 'string')
    ) {
      acc[next] = query[next] as Array<string>;
    }
    return acc;
  }, {} as FilteredQuery);
}
