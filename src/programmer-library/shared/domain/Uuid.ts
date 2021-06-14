import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';
import { InvalidArgumentError } from './InvalidArgumentError';

export class Uuid {
    readonly value: string;

    constructor(value: string) {
      this.ensureIsValidUuid(value);
  
      this.value = value;
    }
  
    static random(): Uuid {
      return new Uuid(uuidv4());
    }
  
    private ensureIsValidUuid(id: string): void {
      if (!uuidValidate(id) && uuidVersion(id) === 4) {
        throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
      }
    }
  
    toString(): string {
      return this.value;
    }
}