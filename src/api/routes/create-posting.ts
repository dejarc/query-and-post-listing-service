import { Request, Response } from 'express';
import { createPostingService } from '../../service/create-posting-service';
import { formatResponseError } from '../../service/error-service';
import { ApiError, TruncatedPosting } from '../../types/data-definitions';

export async function createPosting(req: Request, res: Response) {
  try {
    const posting: TruncatedPosting = req.body;
    const postings = await createPostingService(posting);
    res.send(postings);
  } catch (err) {
    const apiError = formatResponseError(err as ApiError);
    res.status(apiError.statusCode).send(apiError);
  }
}
