// Create a DocumentClient that represents the query to add an item
import DynamoDB from 'aws-sdk/clients/dynamodb';
import Book from '../../domain/Book';
import BookId from '../../domain/BookId';
import BookRepository from '../../domain/BookRepository';

export default class DynamoBookRepository implements BookRepository {
    readonly table: string;
    readonly client: DynamoDB.DocumentClient;

    constructor(table = process.env.SAMPLE_TABLE) {
        this.client = new DynamoDB.DocumentClient();
        this.table = table;
    }

    async findAll(): Promise<Array<Book>> {
        const data = await this.client.scan({ TableName: this.table }).promise();

        return data.Items;
    }

    async find(id: BookId): Promise<Book> {
        var params = {
            TableName : this.table,
            Key: { id: id },
        };
        const data = await this.client.get(params).promise();
        return data.Item;
    }

    async create(book: Book): Promise<void> {
        const bookItem = {};
        const params = {
            TableName: this.table,
            bookItem,
        };

        await this.client.put(params).promise();
    }

    async delete(id: BookId): Promise<void> {
        const bookItem = {}; 
        const params = {
            TableName: this.table,
            bookItem,
        }
        await this.client.delete(params).promise();
    }
}
