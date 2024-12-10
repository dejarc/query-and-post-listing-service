import asyncHandler from 'express-async-handler';
import express, { Router, Express } from 'express';
import { filteredPostingsService } from '../../service/filtered-posting-service';
import { ApiError } from '../../types/data-definitions';
import { formatResponseError } from '../../service/error-service';
const router: Router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    try {
      const postings = await filteredPostingsService(req);
      res.send(postings);
    } catch(err) {
      const apiError = formatResponseError(err as ApiError);
      res.status(apiError.statusCode).send(apiError);
    }
  })
);

export default router;
