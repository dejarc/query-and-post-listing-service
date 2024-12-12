import asyncHandler from 'express-async-handler';
import express, {Router } from 'express';
import { getPostings } from './postings';
import { createPosting } from './create-posting';
const router: Router = express.Router();
router.get('/get-postings', asyncHandler(getPostings));
router.post('/create-posting', asyncHandler(createPosting));
export default router;
