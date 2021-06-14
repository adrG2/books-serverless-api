import { SendMessageResult } from "aws-sdk/clients/sqs";

export interface BookBus {
    send(body: object): Promise<SendMessageResult | string>;
}