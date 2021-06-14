import BookId from "./BookId";

export default class Book {
    readonly id: BookId;

    constructor(id: BookId) {
        this.id = id;
    }

    static create(id: BookId): Book {
        const book = new Book(id);
        return book;
    }
}