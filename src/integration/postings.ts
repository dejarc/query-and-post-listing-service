import {
  Posting,
  PostingApiResponse,
  TruncatedPosting,
} from '../types/data-definitions';
import axios from 'axios';
export async function getPostings(): Promise<Posting[]> {
  const getPostings: PostingApiResponse = await axios
    .get('/postings')
    .then((res) => res.data);
  return getPostings.postings;
}
export async function createPosting(company: TruncatedPosting): Promise<void> {
  await axios.post('/posting', company);
}
