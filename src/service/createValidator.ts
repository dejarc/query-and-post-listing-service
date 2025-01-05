import { get } from 'lodash';
import { PostingValidator, Posting } from '../types/data-definitions';

export function createValidator(
  queryVal: string | Array<string>,
  postingPath: string): PostingValidator {
  if (typeof queryVal === 'string') {
    return (posting: Posting): boolean => {
      const postingVal = get(posting, postingPath, '');
      return (queryVal || postingVal) === postingVal;
    };
  } else {
    const querySet = new Set(queryVal);
    return (posting: Posting): boolean => {
      return querySet.has(get(posting, postingPath));
    };
  }
}
