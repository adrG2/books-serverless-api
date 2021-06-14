import BookId from "./BookId";
import BookTitle from "./BookTitle";

export default class Book {
    readonly id: BookId;
    readonly title: BookTitle;

    constructor(id: BookId, title: BookTitle) {
        this.id = id;
        this.title = title;
    }

    static create(id: BookId, title: BookTitle): Book {
        const book = new Book(id, title);
        return book;
    }
}