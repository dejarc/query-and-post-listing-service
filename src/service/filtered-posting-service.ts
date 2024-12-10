import {
  FilteredQuery,
  Posting,
  CompanyApiResponse,
} from '../types/data-definitions';
import { Request } from 'express';
import { getPostings } from '../integration/postings-integration';
import { getCompanyById } from '../integration/db-integration';

export async function filteredPostingsService(req: Request) {
  const filteredParams = getFilterParameters(req);
  const postings = await getPostings();
  const filteredPostings = filterByFreightProperties(postings, filteredParams);
  return getFormattedResponse(filteredPostings);
}
function getFilterParameters(req: Request): FilteredQuery {
  return ['fullPartial', 'equipmentType'].reduce((acc, cur) => {
    if (req.query[cur]) {
      acc[cur] = req.query[cur] as string;
    }
    return acc;
  }, {} as FilteredQuery);
}

function filterByFreightProperties(
  postings: Posting[],
  params: FilteredQuery
): Posting[] {
  return postings.filter((posting: Posting) => {
    return !Object.keys(params).find((key) => {
      return params[key] !== (posting.freight as { [str: string]: any })[key];
    });
  });
}
function getFormattedResponse(postings: Posting[]): CompanyApiResponse {
  return postings.map((posting) => {
    const companyName = posting.companyName || getCompanyById(posting.companyId).name;
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
