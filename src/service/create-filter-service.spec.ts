import { Posting } from '../types/data-definitions';
import { createFilter } from './create-filter';
describe('createFilter', () => {
  it('Should return true for posting with the correct properties', () => {
    const posting: Posting = {
      companyName: 'test',
      freight: {
        equipmentType: 'Van',
        fullPartial: 'FULL',
        lengthFeet: 30,
        weightPounds: 500,
      },
      id: 'test',
      companyId: 'test'
    };
    const result = createFilter('FULL', 'freight.fullPartial');
    expect(result(posting)).toEqual(true);
  });
  it('Should return false for posting with incorrect value', () => {
    const posting: Posting = {
      companyName: 'test',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 30,
        weightPounds: 500,
      },
      id: 'test',
      companyId: 'test'
    };
    const result = createFilter('Van', 'freight.equipmentType');
    expect(result(posting)).toEqual(false);
  });
  it('Should return true when query value is an array and posting property value is present in the array', () => {
    const posting: Posting = {
      companyName: 'test',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 30,
        weightPounds: 500,
      },
      id: 'test',
      companyId: 'test'
    };
    const result = createFilter(['Van', 'Reefer'], 'freight.equipmentType');
    expect(result(posting)).toEqual(true);
  });
  it('Should return true when query value is empty', () => {
    const posting: Posting = {
      companyName: 'test',
      freight: {
        equipmentType: 'Reefer',
        fullPartial: 'FULL',
        lengthFeet: 30,
        weightPounds: 500,
      },
      id: 'test',
      companyId: 'test'
    };
    const result = createFilter('', 'freight.equipmentType');
    expect(result(posting)).toEqual(true);
  });
 });
