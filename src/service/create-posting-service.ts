import { TruncatedPosting } from '../types/data-definitions';
import { createPosting } from '../integration/postings';
import { has } from 'lodash';
export async function createPostingService(posting: TruncatedPosting) {
  const missingProps = getMissingProperties(posting);
  if (missingProps.length) {
    throw {
      error: 'missing one or more required properties',
      statusCode: 400,
      context: missingProps,
    };
  }
  await createPosting(posting);
  return posting;
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
