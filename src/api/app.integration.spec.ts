import request from 'supertest';
import app from './app';
import postingApiServer from '../mock-services/posting-api-mock-server';
import { CompanyApiResponse } from '../types/data-definitions';
postingApiServer();
function getUnexpectedValue(
  apiResults: CompanyApiResponse,
  full?: string,
  equipment?: string
) {
  return apiResults.find((posting) => {
    const { equipmentType, fullPartial } = posting.freight;
    const expectedEqType = equipment || equipmentType;
    const expectedFullPartial = full || fullPartial;
    return (
      expectedFullPartial != fullPartial || expectedEqType != equipmentType
    );
  });
}
jest.setTimeout(100000);
describe('Company API', () => {
  describe('GET /get-postings', () => {
    it('should fetch a list of all company postings for based on "fullPartial"', async () => {
      const full = 'FULL';
      const url = `/get-postings?fullPartial=${full}`;
      const response = await request(app)
        .get(url)
        .then((res) => res.body);
      const unexpectedResult = getUnexpectedValue(response, full);
      expect(unexpectedResult).toBeUndefined();
    });

    it('should fetch a list of all company postings for based on "equipmentType"', async () => {
      const equipmentType = 'Van';
      const url = `/get-postings?equipmentType=${equipmentType}`;
      const response = await request(app)
        .get(url)
        .then((res) => res.body);
      const unexpectedResult = getUnexpectedValue(
        response,
        undefined,
        equipmentType
      );
      expect(unexpectedResult).toBeUndefined();
    });
    it('should fetch a list of all company postings for based on "fullPartial" only', async () => {
      const full = 'FULL';
      const equipment = 'Van';
      const url = `/get-postings?fullPartial=${full}&equipmentType=${equipment}`;
      const response = await request(app)
        .get(url)
        .then((res) => res.body);
      const unexpectedResult = getUnexpectedValue(response, full, equipment);
      expect(unexpectedResult).toBeUndefined();
    });
  });
  describe('POST /create-posting', () => {
    it('should create a posting and retrieve the newly created posting', async () => {
      const agent = request(app);
      const testData = {
        companyName: 'test-company-5',
        freight: {
          equipmentType: 'Van',
          fullPartial: 'HALF-FULL',
          lengthFeet: 53,
          weightPounds: 36600,
        },
      };
      const response = await agent.post('/create-posting').send(testData);
      expect(response.body).toEqual(testData);
      const full = testData.freight.fullPartial;
      const url = `/get-postings?fullPartial=${full}`;
      const updatedData = await agent.get(url);
      expect(updatedData.body).toEqual([testData]);
    });
    it('should return error when required parameters are missing', async () => {
      const agent = request(app);
      const testData = {
        companyName: 'test-company-5',
        freight: {
          fullPartial: 'HALF-FULL',
          lengthFeet: 53,
          weightPounds: 36600,
        },
      };
      const expectedResponse = {
        error: 'missing one or more required properties',
        statusCode: 400,
        context: ['freight.equipmentType'],
      };
      const response = await agent.post('/create-posting').send(testData);
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
