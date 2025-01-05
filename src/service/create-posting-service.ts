import { TruncatedPosting } from '../types/data-definitions';
import { createPosting } from '../integration/postings';
export async function createPostingService(posting: TruncatedPosting) {
  await createPosting(posting);
  return posting;
}

