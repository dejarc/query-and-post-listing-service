import { get } from 'lodash';
import { PostingValidator, Posting } from '../types/data-definitions';

export function createValidator(
  queryVal: string | Array<string>,
  postingPath: string,
  transformer?: (val: string) => string | number | boolean
): PostingValidator {
  const qValTransformer = transformer || ((val) => val);
  if (typeof queryVal === 'string') {
    const transformedQVal = qValTransformer(queryVal); 
    return (posting: Posting): boolean => {
      const postingVal = get(posting, postingPath, '');
      return (transformedQVal || postingVal) === postingVal;
    };
  } else {
    const querySet = new Set(queryVal.map(qVal => qValTransformer(qVal)));
    return (posting: Posting): boolean => {
      return querySet.has(get(posting, postingPath));
    };
  }
}
