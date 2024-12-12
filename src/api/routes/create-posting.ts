import { Request, Response } from 'express';
import { createPostingService } from '../../service/create-posting-service';
import { formatResponseError } from '../../service/error-service';
import { ApiError } from '../../types/data-definitions';

export async function createPosting(req: Request, res: Response)  {
  try {
    const postings = await createPostingService(req);
    res.send(postings);
  } catch (err) {
    const apiError = formatResponseError(err as ApiError);
    res.status(apiError.statusCode).send(apiError);
  }
};

