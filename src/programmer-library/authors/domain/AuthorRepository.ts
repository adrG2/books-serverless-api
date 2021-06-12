import { Author } from "./Author";

export interface AuthorRepository {
    findAll(): Promise<Array<Author>>
}