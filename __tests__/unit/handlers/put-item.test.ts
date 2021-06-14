import { constructAPIGwEvent } from "../../utils/helpers";

import { putBookHandler } from '../../../src/handlers/PutBookHandler';
import SqsBookBus from '../../../src/programmer-library/books/infrastructure/queue/SqsBookBus';

describe('Test putBookHandler', function () { 
    let putSpy;
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock SQS sendMessage method
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        putSpy = jest.spyOn(SqsBookBus.prototype, 'send');
    });
 
    // Clean up mocks 
    afterAll(() => { 
        putSpy.mockRestore(); 
    }); 
 
    it('should add id to the SQS queue', async () => {
        putSpy.mockReturnValue(Promise.resolve({ MessageId: "5972648d-f5ec-4941-b1bc-1cd890982a22" }));

        const event = constructAPIGwEvent(
            { id: "id1", name: "name1" },
            { method: 'POST' },
        );
     
        // Invoke putItemHandler() 
        const result = await putBookHandler(event); 
 
        expect(result.statusCode).toEqual(201);
        expect(JSON.parse(result.body)).toMatchObject({ MessageId: "5972648d-f5ec-4941-b1bc-1cd890982a22" });
        expect(putSpy).toHaveBeenCalled();
    }); 
}); 
 