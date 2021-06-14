// Create a DocumentClient that represents the query to add an item
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';
import { PromiseResult } from 'aws-sdk/lib/request';
import Book from '../../domain/Book';
import BookId from '../../domain/BookId';
import BookNotFound from '../../domain/BookNotFound';
import BookRepository from '../../domain/BookRepository';
import BooksNotFound from '../../domain/BooksNotFound';
import BookTitle from '../../domain/BookTitle';

export default class DynamoBookRepository implements BookRepository {
    readonly table: string;
    readonly client: DynamoDB.DocumentClient;

    constructor(table = process.env.SAMPLE_TABLE) {
        this.client = new DynamoDB.DocumentClient();
        this.table = table;
    }

    async findAll(): Promise<Array<Book>> {
        const data = await this.client.scan({ TableName: this.table }).promise();
        this.ensureBooksFound(data);
        return data.Items.map(item => this.convertItemToBook(item));
    }

    private ensureBooksFound(data: PromiseResult<DynamoDB.DocumentClient.ScanOutput, AWSError>) {
        if (!data.Items) {
            throw new BooksNotFound(`No books found in table ${this.table}`);
        }
    }

    private convertItemToBook(item: DynamoDB.DocumentClient.AttributeMap): Book {
        return Book.create(new BookId(item.id), new BookTitle(item.title));
    }

    async find(id: BookId): Promise<Book> {
        var params = {
            TableName : this.table,
            Key: { id: id },
        };
        const data = await this.client.get(params).promise();

        this.ensureBookFound(data, id);

        const item = data.Item;
        const book: Book = {
            id: new BookId(item.id),
            title: new BookTitle(item.title)
        }
        return book;
    }

    private ensureBookFound(data: PromiseResult<DynamoDB.DocumentClient.GetItemOutput, AWSError>, id: BookId) {
        if (!data.Item) {
            throw new BookNotFound(`Book with id ${id} not found`);
        }
    }

    async create(book: Book): Promise<void> {
        const item = {
            id: book.id.value,
            title: book.title.value
        }
        const params = {
            TableName: this.table,
            Item: item,
        };

        await this.client.put(params).promise();
    }

}
