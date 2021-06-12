export default class BackOfficeBookId {
    private readonly value: String;

    constructor(value: String) {
        this.value = value;
    }

    getValue(): String {
        return this.value;
    }
}