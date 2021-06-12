import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import AwsSqsBackOfficeBook from '../books/infrastructure/queue/AwsSqsBackOfficeBook';
// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const putBookHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const body = JSON.parse(event.body)
    const id = body.id;
    const name = body.name;

    const client = new AwsSqsBackOfficeBook();
    const result = await client.send({ id, name });

    const response = {
        statusCode: 201,
        body: JSON.stringify({ MessageId: result.MessageId })
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
