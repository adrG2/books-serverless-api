import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import { DynamoBookRepository } from '../programmer-library/books/infrastructure/persistence/DynamoBookRepository';


/**
 * A simple example includes a HTTP get method to get all books from a DynamoDB table.
 */
export const getBooksHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllBooks only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

    const client = new DynamoBookRepository();
    const books = await client.findAll();

    const response = {
        statusCode: 200,
        body: JSON.stringify(books.map(book => book.toPrimitive()))
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
