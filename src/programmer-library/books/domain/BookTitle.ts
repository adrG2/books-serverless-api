import StringValueObject from "../../shared/domain/StringValueObject";

export default class BookTitle extends StringValueObject {
    constructor(value: string) {
        super(value);
    }
}