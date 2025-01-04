import { getFilteredParams } from './filter-query-params-service';
import { ParsedQs } from 'qs';
describe('getFilteredParams', () => {
  it('Should remove properties that are not simple strings or string arrays', () => {
    const queryParams: ParsedQs = {
      fullPartial: 'FULL',
      equipmentType: [{ key: 'Van' }],
    };
    const expected = { fullPartial: queryParams.fullPartial };
    const result = getFilteredParams(queryParams);
    expect(result).toEqual(expected);
  });
  it('Should return an empty object when all properties are incorrect type', () => {
    const queryParams: ParsedQs = {
      fullPartial: [{ key: 'FULL' }],
      equipmentType: [{ key: 'Van' }],
    };
    const expected = {};
    const result = getFilteredParams(queryParams);
    expect(result).toEqual(expected);
  });
  it('Should return all query parameters when all parameters are either string or array of strings', () => {
    const queryParams: ParsedQs = {
      fullPartial: ['FULL'],
      equipmentType: ['Van'],
    };
    const result = getFilteredParams(queryParams);
    expect(result).toEqual(queryParams);
  });
});
