import { TruncatedPosting } from '../types/data-definitions';
import { Request } from 'express';
import { createPosting } from '../integration/postings-integration';
import { has } from 'lodash';
export async function createPostingService(req: Request) {
  const posting: TruncatedPosting = req.body;
  const missingProps = getMissingProperties(posting);
  if (missingProps.length) {
    throw {
      error: 'missing one or more required properties',
      statusCode: 400,
      context: missingProps,
    };
  }
  await createPosting(posting);
  return {
    message: 'posting created successfully',
  };
}

function getMissingProperties(posting: TruncatedPosting): string[] {
  return [
    'companyName',
    'freight.weightPounds',
    'freight.equipmentType',
    'freight.fullPartial',
    'freight.lengthFeet',
  ].filter((property: string) => {
    return !has(posting, property);
  });
}
