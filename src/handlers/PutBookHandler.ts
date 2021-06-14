import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import SqsBookBus from '../programmer-library/books/infrastructure/bus/SqsBookBus';
// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a HTTP post method to add one book to a DynamoDB table.
 */
export const putBookHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.info('received:', event);
    
    const body = JSON.parse(event.body)
    const id = body.id;
    const title = body.title;

    const client = new SqsBookBus();
    const result = await client.send({ id, title });

    const response = {
        statusCode: 201,
        body: JSON.stringify({ MessageId: result.MessageId })
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
