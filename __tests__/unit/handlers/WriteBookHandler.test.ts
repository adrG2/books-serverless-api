import { constructSQSEvent } from "../../utils/helpers";

// Import all functions from put-item.js
import { writeBookHandler } from '../../../src/handlers/WriteBookHandler';
// Import dynamodb from aws-sdk
import dynamodb from 'aws-sdk/clients/dynamodb';
import { BookMother } from "../../utils/books/domain/BookMother";

describe('Test writeBookHandler', function () {
    let writeSpy;

    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    beforeAll(() => {
        // Mock dynamodb get and put methods
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        writeSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
    });

    // Clean up mocks
    afterAll(() => {
        writeSpy.mockRestore();
    });

    it('should add id to the table', async () => {
        
        const book = BookMother.random().toPrimitive();

        writeSpy.mockReturnValue({
            promise: () => Promise.resolve(book)
        });

        const event = constructSQSEvent(book);

        await writeBookHandler(event);

        expect(writeSpy).toHaveBeenCalled();
    });
});
