import { Request, Response } from 'express';
import { filteredPostingsService } from '../../service/filtered-posting-service';
import { ApiError } from '../../types/data-definitions';
import { formatResponseError } from '../../service/error-service';

export async function getPostings(req: Request, res: Response) {
  try {
    const postings = await filteredPostingsService(req);
    res.send(postings);
  } catch (err) {
    const apiError = formatResponseError(err as ApiError);
    res.status(apiError.statusCode).send(apiError);
  }
}
