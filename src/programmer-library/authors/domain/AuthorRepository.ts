import { Author } from "./Author";
import { AuthorId } from "./AuthorId";

export interface AuthorRepository {
    findAll(): Promise<Array<Author>>;
    find(id: AuthorId): Promise<Author>;
    create(author: Author): Promise<void>;
    update(author: Author): Promise<void>;
    delete(id: AuthorId): Promise<void>;
}