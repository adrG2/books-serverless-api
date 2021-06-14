import { constructAPIGwEvent } from "../../utils/helpers";

import { getBookByIdHandler } from '../../../src/handlers/GetBookByIdHandler'; 
import { DocumentClient } from 'aws-sdk/clients/dynamodb'; 
 
describe('Test getBookByIdHandler', () => { 
    let getSpy; 
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        getSpy = jest.spyOn(DocumentClient.prototype, 'get'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        getSpy.mockRestore(); 
    }); 
 
    it('should get book by id', async () => { 
        const item = { id: 'id1' }; 
 
        getSpy.mockReturnValue({ 
            promise: () => Promise.resolve({ Item: item }) 
        }); 
 
        const event = constructAPIGwEvent({}, { 
            httpMethod: 'GET', 
            pathParameters: { 
                id: 'id1' 
            } 
        });
 
        const result = await getBookByIdHandler(event); 
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(item) 
        }; 
 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 