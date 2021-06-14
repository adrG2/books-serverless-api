import { SendMessageResult } from "aws-sdk/clients/sqs";

export default interface BookBus {
    send(body: object): Promise<SendMessageResult | string>;
}