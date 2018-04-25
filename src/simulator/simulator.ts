import {
  Parser,
} from 'assembler';

import {
  RegisterFile,
} from 'hardware';

import {
  InstructionSet,
} from 'instruction';

export type SimulatorObserver = (line: number) => void;

export class Simulator {
  observer: (SimulatorObserver|null) = null;
  instructionSet: InstructionSet;
  registerFile: RegisterFile;
  parser: Parser;

  constructor(registerMap: {[id: string]: number}) {
    this.setRegister(registerMap);
  }

  setRegister(registerMap: {[id: string]: number}): void {
    this.registerFile = new RegisterFile(registerMap);
    this.instructionSet = new InstructionSet(this.registerFile);
    const keyword: string[] = Object.keys(this.instructionSet.instructions);
    this.parser = new Parser(registerMap, keyword);
  }

  run(asmCode: string): void {
    const parserResult: (string|number)[][] = this.parser.parse(asmCode);
    for (let indexStr in parserResult) {
      const index: number = parseInt(indexStr, 10);
      if (!parserResult[index]) {
        // comment
        continue;
      }

      this.notifyObserver(index);

      const operation: (string|number)[] = parserResult[index];
      // run code
      this.instructionSet
        .getInstruction(operation[0] as string)
        .run(
          operation[1] as number,
          operation[2] as number,
          operation[3] as number,
        );
    }
  }

  notifyObserver(line: number): void {
    if (this.observer) {
      this.observer(line);
    }
  }
}
