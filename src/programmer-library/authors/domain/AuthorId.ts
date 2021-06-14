import { Uuid } from "../../shared/domain/Uuid";

export class AuthorId extends Uuid {
    constructor(value: string) {
        super(value);
    }
}