import { BookTitle } from "../../../../src/programmer-library/books/domain/BookTitle";
import { ProgrammerBookMother } from "../../shared/domain/ProgrammerBookMother";

export class BookTitleMother {
    static create(value: string): BookTitle {
        return new BookTitle(value);
      }
    
      static random(): BookTitle {
        return this.create(ProgrammerBookMother.random());
      }
}