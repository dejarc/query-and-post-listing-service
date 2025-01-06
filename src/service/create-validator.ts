import { get } from 'lodash';
import {
  PostingValidator,
  Posting,
  ValidatorOptions,
} from '../types/data-definitions';

export function createValidator(
  queryVal: undefined | string | Array<string>,
  postingPath: string,
  options: ValidatorOptions = {}
): PostingValidator {
  const { queryTransformer = (val) => val } = options;
  const { postTransformer = (val) => val } = options;
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
