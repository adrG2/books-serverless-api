import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import { DynamoBookRepository } from '../programmer-library/books/infrastructure/persistence/DynamoBookRepository';
import BookId from '../programmer-library/books/domain/BookId';
// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
export const getBookByIdHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
 
  // Get id from pathParameters from APIGateway because of `/{id}` at template.yml
  const id = event.pathParameters.id;
 
  const client = new DynamoBookRepository();
  const book = await client.find(new BookId(id));

  const response = {
    statusCode: 200,
    body: JSON.stringify(book)
  };
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
