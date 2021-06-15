export class ProgrammerBookMother {
  static readonly books = [
    'Clean Code', 
    'Code Complete', 
    'Refactoring', 
    'Clean Architecture', 
    'Building Microservices', 
    'Growing Object-Oriented Software, Guided by Tests', 
    'Programming AWS Lambda', 
    'You dont know js', 
    'Working Effectively with Legacy Code', 
    'Building Event-Driven Microservices', 
    'Effetive Java'];

  static random(): string {
    return this.books[Math.floor(Math.random() * this.books.length)];
  }
}
