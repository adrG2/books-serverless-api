import { Uuid } from "../../shared/domain/Uuid";

export class BookId extends Uuid {
    constructor(value: string) {
        super(value);
    }
}