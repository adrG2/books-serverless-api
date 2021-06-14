export class BookNotCreated extends Error {
    constructor(message: string) {
        super(message);
    }
}