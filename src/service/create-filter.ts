import { get } from 'lodash';
import {
  PostingValidator,
  Posting,
  ValidatorOptions,
} from '../types/data-definitions';

export function createFilter(
  queryVal: string | Array<string>,
  postingPath: string,
  options?: ValidatorOptions
): PostingValidator {
  const validatorOptions = options || {};
  const { queryTransformer = (val: string) => val } = validatorOptions;
  const { postingTransformer = (val: string) => val } = validatorOptions;
  if (typeof queryVal === 'string') {
    const transformedQVal = queryTransformer(queryVal);
    return (posting: Posting): boolean => {
      const postingVal = postingTransformer(get(posting, postingPath, ''));
      return (transformedQVal || postingVal) === postingVal;
    };
  } else {
    const querySet = new Set(queryVal.map((qVal) => queryTransformer(qVal)));
    return (posting: Posting): boolean => {
      return querySet.has(postingTransformer(get(posting, postingPath)));
    };
  }
}
