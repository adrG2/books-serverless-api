import { Uuid } from "../../../../src/programmer-library/shared/domain/Uuid";
import { MotherCreator } from "./MotherCreator";

export class UuidMother {
    static randomFaker(): string {
      return MotherCreator.random().datatype.uuid();
    }

    static random(): string {
      return Uuid.random().value;
    }
  }