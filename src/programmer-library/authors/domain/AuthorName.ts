import StringValueObject from "../../shared/domain/StringValueObject";

export class AuthorName extends StringValueObject {
    constructor(value: string) {
        super(value);
    }
}