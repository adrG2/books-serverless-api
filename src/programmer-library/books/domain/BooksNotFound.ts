export class BooksNotFound extends Error {
    constructor(message: string) {
        super(message);
    }
}