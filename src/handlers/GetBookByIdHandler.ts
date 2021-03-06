import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import { DynamoBookRepository } from '../programmer-library/books/infrastructure/persistence/DynamoBookRepository';
import { BookId } from '../programmer-library/books/domain/BookId';

/**
 * A simple example includes a HTTP get method to get one book by id from a DynamoDB table.
 */
export const getBookByIdHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }

  console.info('received:', event);

  const id = event.pathParameters.id; 
  const client = new DynamoBookRepository();
  const book = await client.find(new BookId(id));

  const response = {
    statusCode: 200,
    body: JSON.stringify(book.toPrimitive())
  };
 
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
