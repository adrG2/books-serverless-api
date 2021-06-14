import 'source-map-support/register';
import { SQSEvent } from 'aws-lambda';
import DynamoBookRepository from '../programmer-library/books/infrastructure/persistence/DynamoBookRepository';
import Book from '../programmer-library/books/domain/Book';
import BookId from '../programmer-library/books/domain/BookId';
import BookTitle from '../programmer-library/books/domain/BookTitle';
// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a SQS queue listener to untie HTTP POST API from “heavy” write to DB.
 */
export const writeBookHandler = async (
    event: SQSEvent,
) => {
    console.info('Received from SQS:', event);

    for (const record of event.Records) {
        const body = JSON.parse(record.body);
        const book: Book = Book.create(new BookId(body.id), new BookTitle(body.title));

        const client = new DynamoBookRepository();
        await client.create(book);

        console.info('Written to DynamoDB:', book)
    }
}
