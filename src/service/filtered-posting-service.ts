import {
  Posting,
  CompanyApiResponse,
  FilteredQuery,
  PostingValidator
} from '../types/data-definitions';
import { getPostings } from '../integration/postings';
import { getAllCompaniesById } from '../integration/company';
import { get } from 'lodash';
import { createValidator } from './create-validator';
export async function filteredPostingsService(params: FilteredQuery) {
  const filteredParams = getPostingValidators(params);
  const postings = await getPostings();
  const filteredPostings = filterByFreightProperties(postings, filteredParams);
  return getFormattedResponse(filteredPostings);
}
function getPostingValidators(
  params: FilteredQuery
): PostingValidator[] {
  return [
    createValidator(params.fullPartial, 'freight.fullPartial'),
    createValidator(params.equipmentType, 'freight.equipmentType')
  ];
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
