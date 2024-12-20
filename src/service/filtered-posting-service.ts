import {
  Posting,
  CompanyApiResponse,
  Validator,
} from '../types/data-definitions';
import { Request } from 'express';
import { getPostings } from '../integration/postings';
import { getAllCompaniesById } from '../integration/company';
import { StringValidator } from './param-validator';
export async function filteredPostingsService(req: Request) {
  const filteredParams = getFilterParameters(req);
  const postings = await getPostings();
  const filteredPostings = filterByFreightProperties(postings, filteredParams);
  return getFormattedResponse(filteredPostings);
}
function getFilterParameters(req: Request): Validator[] {
  return [
    new StringValidator('fullPartial', 'freight.fullPartial'),
    new StringValidator('equipmentType', 'freight.equipmentType'),
  ].map((val) => val.setValue(req.query));
}

function filterByFreightProperties(
  postings: Posting[],
  validators: Validator[]
): Posting[] {
  return postings.filter((posting: Posting) => {
    return !validators.find((validator) => !validator.hasValue(posting));
  });
}
function getFormattedResponse(postings: Posting[]): CompanyApiResponse {
  const allById = getAllCompaniesById(
    postings.map((posting) => posting.companyId)
  );
  return postings.map((posting) => {
    const companyName = posting.companyName || allById[posting.companyId];
    const { weightPounds, equipmentType, fullPartial, lengthFeet } =
      posting.freight;
    return {
      companyName: companyName,
      freight: {
        weightPounds,
        equipmentType,
        fullPartial,
        lengthFeet,
      },
    };
  });
}
