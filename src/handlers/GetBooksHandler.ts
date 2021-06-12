import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import { AwsDynamoBookRepository } from '../books/infrastructure/persistence/AwsDynamoBookRepository';

// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getBooksHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    const client = new AwsDynamoBookRepository();
    const books = await client.findAll();

    const response = {
        statusCode: 200,
        body: JSON.stringify(books)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
