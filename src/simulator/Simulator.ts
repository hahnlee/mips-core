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

  constructor(registerMap: {[id: string]: number}, clock: number, ipc: number) {
    this.registerFile = new RegisterFile(registerMap);
    const mspi: number = 1000 / (clock * ipc);
    this.instructionSet = new InstructionSet(this.registerFile, mspi);
    const keyword: string[] = Object.keys(this.instructionSet.instructions);
    this.parser = new Parser(registerMap, keyword);
  }

  async run(asmCode: string): Promise<void> {
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
      await this.instructionSet
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
