
import Book from "./Book";
import BookId from "./BookId";

export default interface BookRepository {
    findAll(): Promise<Array<Book>>;
    find(id: BookId): Promise<Book>;
    create(book: Book): Promise<void>;
}