export class BookNotFound extends Error {
    constructor(message: string) {
        super(message);
    }
}