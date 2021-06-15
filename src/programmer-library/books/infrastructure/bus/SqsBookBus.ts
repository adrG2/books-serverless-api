import SQS, { SendMessageResult } from 'aws-sdk/clients/sqs';
import { BookBus } from '../../domain/BookBus';

// Declare some custom client just to illustrate how TS will include only used files into lambda distribution
export class SqsBookBus implements BookBus {
    queue: string;
    sqs: SQS;

    constructor(queue = process.env.BOOKS_QUEUE) {
        this.sqs = new SQS();
        this.queue = queue;
    }

    async send(body: object): Promise<SendMessageResult> {
        const sqs = new SQS();
        const params = {
            MessageBody: JSON.stringify(body),
            QueueUrl: this.queue,
            DelaySeconds: 0,
        }
        console.log(params);
        return await sqs.sendMessage(params, (err, data) => {
            if (err) {
                throw err;
            }
            console.log(data);
        }).promise();
    }
}
