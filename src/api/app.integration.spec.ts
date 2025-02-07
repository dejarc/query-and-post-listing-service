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
    const equipmentType = posting?.freight?.equipmentType;
    const fullPartial = posting?.freight?.fullPartial;
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
    it('should fetch a list of all company postings by "fullPartial"', async () => {
      const full = 'FULL';
      const url = `/get-postings?fullPartial=${full}`;
      const response = await request(app)
        .get(url)
        .then((res) => res.body);
      const unexpectedResult = getUnexpectedValue(response, full);
      expect(unexpectedResult).toBeUndefined();
    });

    it('should fetch a list of all company postings by "equipmentType"', async () => {
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
    it('should fetch a list of all company postings by "fullPartial" and "equipmentType"', async () => {
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
          fullPartial: 'FULL',
          lengthFeet: 53,
          weightPounds: 36600,
        },
      };
      const response = await agent.post('/create-posting').send(testData);
      expect(response.body).toEqual(testData);
      const full = testData.freight.fullPartial;
      const url = `/get-postings?fullPartial=${full}`;
      const updatedData = await agent.get(url);
      const allResults = updatedData.body;
      expect(allResults[allResults.length - 1]).toEqual(testData);
    });
    it('should return error when required parameters are missing', async () => {
      const agent = request(app);
      const testData = {
        companyName: 'test-company-5',
        freight: {
          fullPartial: 'FULL',
          lengthFeet: 53,
          weightPounds: 36600,
        },
      };
      const expectedResponse = {
        message: 'Invalid properties detected, consult context for more information.',
        statusCode: 400,
        context: ['freight.equipmentType'],
      };
      const response = await agent.post('/create-posting').send(testData);
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
