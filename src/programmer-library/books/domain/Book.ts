import BackOfficeBookId from "./BookId";

export class BackOfficeBook {
    readonly id: BackOfficeBookId;

    constructor(id: BackOfficeBookId) {
        this.id = id;
    }

    static create(id: BackOfficeBookId): BackOfficeBook {
        const book = new BackOfficeBook(id);
        return book;
    }
}