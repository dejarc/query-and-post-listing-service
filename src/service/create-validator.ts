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
  if (typeof queryVal === 'undefined') {
    return () => true;
  } else if (typeof queryVal === 'string') {
    const transformedQVal = queryTransformer(queryVal);
    return (posting: Posting): boolean => {
      return transformedQVal === postTransformer(get(posting, postingPath));
    };
  } else {
    const querySet = new Set(queryVal.map((qVal) => queryTransformer(qVal)));
    return (posting: Posting): boolean => {
      return querySet.has(postTransformer(get(posting, postingPath)));
    };
  }
}
