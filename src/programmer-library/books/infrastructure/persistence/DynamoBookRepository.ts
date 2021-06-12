// Create a DocumentClient that represents the query to add an item
import DynamoDB from 'aws-sdk/clients/dynamodb';
import BackOfficeBookId from '../../domain/BookId';
import BookRepository from '../../domain/BookRepository';

// Declare some custom client just to illustrate how TS will include only used files into lambda distribution
export class DynamoBookRepository implements BookRepository {
    readonly table: string;
    readonly client: DynamoDB.DocumentClient;

    constructor(table = process.env.SAMPLE_TABLE) {
        this.client = new DynamoDB.DocumentClient();
        this.table = table;
    }

    async findAll(): Promise<void> {
        const data = await this.client.scan({ TableName: this.table }).promise();
        const backOfficeBooks = data.Items.map(item => {
            item.get("")
        });
    }

    async find(id: BackOfficeBookId) {
        var params = {
            TableName : this.table,
            Key: { id: id },
        };
        const data = await this.client.get(params).promise();
        return data.Item;
    }

    async create(Item: object) {
        const params = {
            TableName: this.table,
            Item,
        };

        return await this.client.put(params).promise();
    }
}
