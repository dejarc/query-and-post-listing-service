import {
  Posting,
  CompanyApiResponse,
  FilteredQuery,
} from '../types/data-definitions';
import { getPostings } from '../integration/postings';
import { getAllCompaniesById } from '../integration/company';
import { get } from 'lodash';
export async function filteredPostingsService(params: FilteredQuery) {
  const filteredParams = getFilterParameters(params);
  const postings = await getPostings();
  const filteredPostings = filterByFreightProperties(postings, filteredParams);
  return getFormattedResponse(filteredPostings);
}
function getFilterParameters(
  params: FilteredQuery
): { (posting: Posting): boolean }[] {
  return [
    createValidator(get(params, 'fullPartial', ''), 'freight.fullPartial'),
    createValidator(get(params, 'equipmentType', ''), 'freight.equipmentType'),
  ];
}
function createValidator(
  requestedVal: string | Array<string>,
  pathOnPosting: string
): (posting: Posting) => boolean {
  if (typeof requestedVal === 'string') {
    return (posting: Posting): boolean => {
      const postingVal = get(posting, pathOnPosting, '');
      return (requestedVal || postingVal) === postingVal;
    };
  } else {
    const querySet = new Set(requestedVal);
    return (posting: Posting): boolean => {
      return querySet.has(get(posting, pathOnPosting));
    };
  }
}
function filterByFreightProperties(
  postings: Posting[],
  validators: { (posting: Posting): boolean }[]
): Posting[] {
  return postings.filter((posting: Posting) => {
    return !validators.find((validator) => !validator(posting));
  });
}
function getFormattedResponse(postings: Posting[]): CompanyApiResponse {
  const allById = getAllCompaniesById(
    postings.map((posting) => posting.companyId)
  );
  return postings.map((posting) => {
    const companyName = posting.companyName || allById[posting.companyId];
    return {
      companyName: companyName,
      freight: {
        weightPounds: get(posting, 'freight.weightPounds', null),
        equipmentType: get(posting, 'freight.equipmentType', null),
        fullPartial: get(posting, 'freight.fullPartial', null),
        lengthFeet: get(posting, 'freight.lengthFeet', null),
      },
    };
  });
}
