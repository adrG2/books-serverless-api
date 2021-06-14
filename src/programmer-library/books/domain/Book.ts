import { BookId } from "./BookId";
import { BookTitle } from "./BookTitle";

export class Book {
    readonly id: BookId;
    readonly title: BookTitle;

    constructor(id: BookId, title: BookTitle) {
        this.id = id;
        this.title = title;
    }

    public toPrimitive() {
        return {
            id: this.id.value,
            title: this.title.value
        }
    }

    static create(id: BookId, title: BookTitle): Book {
        const book = new Book(id, title);
        return book;
    }
}