import SQS from 'aws-sdk/clients/sqs';
import BookBus from '../../domain/BookBus';

// Declare some custom client just to illustrate how TS will include only used files into lambda distribution
export default class SqsBookBus implements BookBus {
    queue: string;
    sqs: SQS;

    constructor(queue = process.env.ITEM_QUEUE) {
        this.sqs = new SQS();
        this.queue = queue;
    }

    async send(body: object): Promise<void> {
        const sqs = new SQS();
        const params = {
            MessageBody: JSON.stringify(body),
            QueueUrl: this.queue,
            DelaySeconds: 0,
        }
        await sqs.sendMessage(params).promise();
    }
}
