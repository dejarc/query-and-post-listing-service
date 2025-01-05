import { get } from 'lodash';
import {
  PostingValidator,
  Posting,
  ValidatorOptions,
} from '../types/data-definitions';

export function createValidator(
  queryVal: undefined | string | Array<string>,
  postingPath: string,
  options?: ValidatorOptions
): PostingValidator {
  const validatorOptions = options || {};
  const { queryTransformer = (val) => val } = validatorOptions;
  const { postTransformer = (val) => val } = validatorOptions;
  if (typeof queryVal === 'undefined' || typeof queryVal === 'string') {
    const transformedQVal = queryTransformer(queryVal);
    return (posting: Posting): boolean => {
      const postingVal = postTransformer(get(posting, postingPath, ''));
      return (transformedQVal || postingVal) === postingVal;
    };
  } else {
    const querySet = new Set(queryVal.map((qVal) => queryTransformer(qVal)));
    return (posting: Posting): boolean => {
      return querySet.has(postTransformer(get(posting, postingPath, '')));
    };
  }
}
