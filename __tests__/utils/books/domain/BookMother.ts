import { Book } from "../../../../src/programmer-library/books/domain/Book";
import { BookId } from "../../../../src/programmer-library/books/domain/BookId";
import { BookTitle } from "../../../../src/programmer-library/books/domain/BookTitle";
import { BookIdMother } from "./BookIdMother";
import { BookTitleMother } from "./BookTitleMother";

export class BookMother {
    static create(id: BookId, title: BookTitle): Book {
      return new Book(id, title);
    }
  
    static random(): Book {
      return this.create(BookIdMother.random(), BookTitleMother.random());
    }
}