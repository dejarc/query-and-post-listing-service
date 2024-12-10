import asyncHandler from 'express-async-handler';
import express, { Router, Express } from 'express';
import { createPostingService } from '../../service/create-posting-service';
import { formatResponseError } from '../../service/error-service';
import { ApiError } from '../../types/data-definitions';
const router: Router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    try {
      const postings = await createPostingService(req);
      res.send(postings);
    } catch (err) {
      const apiError = formatResponseError(err as ApiError);
      res.set(apiError.statusCode).send(apiError);
    }
  })
);

export default router;
