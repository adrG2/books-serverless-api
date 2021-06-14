import Uuid from "../../shared/domain/Uuid";

export default class BookId extends Uuid {
    constructor(value: string) {
        super(value);
    }
}