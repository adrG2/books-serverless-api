// Impl azure cosmos db

import { BackOfficeBook } from "../../domain/Book";
import bookId from "../../domain/BookId";
import BookRepository from "../../domain/BookRepository";

export class AzureCosmosBookRepository implements BookRepository {
    findAll(): Promise<BackOfficeBook[]> {
        throw new Error("Method not implemented.");
    }
    find(id: bookId): Promise<BackOfficeBook> {
        throw new Error("Method not implemented.");
    }
    create(book: BackOfficeBook): Promise<void> {
        throw new Error("Method not implemented.");
    }
    matching(criteria: any): Promise<BackOfficeBook[]> {
        throw new Error("Method not implemented.");
    }

}