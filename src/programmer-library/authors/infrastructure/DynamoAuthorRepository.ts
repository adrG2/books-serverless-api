import { Author } from "../domain/Author";
import { AuthorId } from "../domain/AuthorId";
import { AuthorRepository } from "../domain/AuthorRepository";

export class DynamoAuthorRepository implements AuthorRepository {
    findAll(): Promise<Author[]> {
        throw new Error("Method not implemented.");
    }
    find(id: AuthorId): Promise<Author> {
        throw new Error("Method not implemented.");
    }
    create(author: Author): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(author: Author): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: AuthorId): Promise<void> {
        throw new Error("Method not implemented.");
    }

}