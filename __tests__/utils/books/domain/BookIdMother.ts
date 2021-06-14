import { BookId } from "../../../../src/programmer-library/books/domain/BookId";
import { UuidMother } from "../../shared/domain/UuidMother";

export class BookIdMother {
    static create(value: string): BookId {
        return new BookId(value);
      }
    
      static creator() {
        return () => BookIdMother.random();
      }
    
      static random(): BookId {
        return this.create(UuidMother.random());
      }
}