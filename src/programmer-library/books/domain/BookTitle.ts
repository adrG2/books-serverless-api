import StringValueObject from "../../shared/domain/StringValueObject";

export class BookTitle extends StringValueObject {
    constructor(value: string) {
        super(value);
    }
}