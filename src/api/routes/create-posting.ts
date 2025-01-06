import { Request, Response } from 'express';
import { createPostingService } from '../../service/create-posting-service';
import { formatResponseError } from '../../service/error-service';
import {  TruncatedPosting } from '../../types/data-definitions';
import { ApiError } from '../../types/api-error';
import { z } from 'zod';
const Posting = z.object({
  companyName: z.string(),
  freight: z.object({
    weightPounds: z.number(),
    equipmentType: z.string(),
    fullPartial: z.enum(['FULL', 'PARTIAL']),
    lengthFeet: z.number(),
  }),
});
export async function createPosting(req: Request, res: Response) {
  try {
    const posting: TruncatedPosting = req.body;
    const parseResult = Posting.safeParse(posting);
    if (!parseResult.success) {
      const {issues} = parseResult.error;
      throw new ApiError({
        message: 'Invalid properties detected, consult context for more information.',
        statusCode: 400,
        context: issues.reduce((acc, next) => {
          acc.push(next.path.join('.'));
          return acc;
        }, [] as Array<string>)
      });
    }
    const postings = await createPostingService(posting);
    res.send(postings);
  } catch (err) {
    const apiError = formatResponseError(err as ApiError);
    res.status(apiError.statusCode).send(apiError);
  }
}
