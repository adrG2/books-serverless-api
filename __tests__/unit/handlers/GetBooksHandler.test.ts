import { constructAPIGwEvent } from "../../utils/helpers";

import { getBooksHandler } from '../../../src/handlers/GetBooksHandler';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { BookMother } from "../../utils/books/domain/BookMother";
 
describe('Test getBooksHandler', () => { 
    let scanSpy; 
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        scanSpy = jest.spyOn(DocumentClient.prototype, 'scan'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        scanSpy.mockRestore(); 
    }); 
 
    it('should return ids', async () => {
        const firstBook = BookMother.random().toPrimitive();
        const secondBook = BookMother.random().toPrimitive();
        const books = [firstBook, secondBook]; 
 
        scanSpy.mockReturnValue({ 
            promise: () => Promise.resolve({ Items: books }) 
        }); 
 
        const event = constructAPIGwEvent({}, { method: 'GET' });
 
        const result = await getBooksHandler(event); 
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(books) 
        }; 
 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
