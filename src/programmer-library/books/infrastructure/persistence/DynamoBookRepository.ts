// Create a DocumentClient that represents the query to add an item
import DynamoDB, { GetItemInput, PutItemInput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';
import { PromiseResult } from 'aws-sdk/lib/request';
import { Book } from '../../domain/Book';
import { BookId } from '../../domain/BookId';
import { BookNotCreated } from '../../domain/BookNotCreated';
import { BookNotFound } from '../../domain/BookNotFound';
import { BookRepository } from '../../domain/BookRepository';
import { BooksNotFound } from '../../domain/BooksNotFound';
import { BookTitle } from '../../domain/BookTitle';

export class DynamoBookRepository implements BookRepository {
    readonly table: string;
    readonly client: DynamoDB.DocumentClient;

    constructor(table = process.env.SAMPLE_TABLE) {
        this.client = new DynamoDB.DocumentClient();
        this.table = table;
    }

    async findAll(): Promise<Array<Book>> {
        const params = { 
            TableName: this.table 
        };
        const data = await this.client.scan(params).promise();
        this.ensureBooksFound(data);
        return data.Items.map(this.mapperMapDynamoToBook);
    }

    private ensureBooksFound(data) {
        if (!data.Items) {
            throw new BooksNotFound(`No books found in table ${this.table}`);
        }
    }

    private mapperMapDynamoToBook(item: DynamoDB.DocumentClient.AttributeMap): Book {
        return Book.create(new BookId(item.id), new BookTitle(item.title));
    }

    async find(id: BookId): Promise<Book> {
        const params = {
            TableName: this.table,
            Key: {
                id: id.value
            }
        };
        const data = await this.client.get(params).promise();
        this.ensureBookFound(data, id);
        
        const item = data.Item;
        return Book.create(new BookId(item.id), new BookTitle(item.title));
    }

    private ensureBookFound(data, id: BookId) {
        if (!data.Item) {
            throw new BookNotFound(`Book with id ${id} not found`);
        }
    }

    async create(book: Book): Promise<void> {
        const params = {
            TableName: this.table,
            Item: {
                id: book.id.value,
                title: book.title.value
            },
            ConditionExpression: 'attribute_not_exists(id)'
        };
        await this.client.put(params, (err, data) => {
            if (err) {
                throw new BookNotCreated(`Book with id ${book.id.value} not created`);
            }
        }).promise();
    }
}
