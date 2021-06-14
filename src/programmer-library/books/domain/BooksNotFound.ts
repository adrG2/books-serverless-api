export default class BooksNotFound extends Error {
    constructor(message: string) {
        super(message);
    }
}