import 'source-map-support/register';
import { SQSEvent } from 'aws-lambda';
import { AwsDynamoBookRepository } from '../programmer-library/books/infrastructure/persistence/AwsDynamoBookRepository';
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
        const item = { id: body.id, name: body.name };

        const client = new AwsDynamoBookRepository();
        await client.create(item);

        console.info('Written to DynamoDB:', item)
    }
}
