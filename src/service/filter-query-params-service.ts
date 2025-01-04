import { FilteredQuery } from '../types/data-definitions';
import { ParsedQs } from 'qs';
export function getFilteredParams(query: ParsedQs): FilteredQuery {
  return Object.keys(query).reduce((acc, next) => {
    if (typeof query[next] === 'string') {
      acc[next] = query[next] as string;
    } else if (
      Array.isArray(query[next]) &&
      (query[next] as Array<string>).every((entry) => typeof entry === 'string')
    ) {
      acc[next] = query[next] as Array<string>;
    }
    return acc;
  }, {} as FilteredQuery);
}
