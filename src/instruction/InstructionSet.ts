import {
  Instruction,
  InstructionFormat,
} from './Instruction';

import {
  RegisterFile,
} from 'hardware';

function sleep(ms: number) {
  return new Promise(resolve=> setTimeout(resolve, ms));
}

export class InstructionSet {
  private registerFile: RegisterFile;
  mspi: number;

  private getRegVal(registerNum: number): number {
    return this.registerFile.getRegister(registerNum).get();
  }

  private setRegVal(registerNum: number, value: number): void {
    return this.registerFile.getRegister(registerNum).set(value);
  }

  instructions: {[id: string]: Instruction} = {
    'add': {
      format: InstructionFormat.R_FORMAT,
      run: async (rs: number, rt: number, rd: number) => {
        const sleepTime: number = this.mspi / 3;
        const rtValue: number = this.getRegVal(rt);
        await sleep(sleepTime);
        const rdValue: number = this.getRegVal(rd);
        await sleep(sleepTime);
        this.setRegVal(rs, rtValue + rdValue);
        await sleep(sleepTime);
      },
    },
    'addi': {
      format: InstructionFormat.I_FORMAT,
      run: async (rs: number, rt: number, imm: number) => {
        const sleepTime: number = this.mspi / 2;
        const rtValue: number = this.getRegVal(rt);
        await sleep(sleepTime);
        this.setRegVal(rs, rtValue + imm);
        await sleep(sleepTime);
      },
    },
    'sub': {
      format: InstructionFormat.R_FORMAT,
      run: async (rs: number, rt: number, rd: number) => {
        const sleepTime: number = this.mspi / 3;
        const rtValue: number = this.getRegVal(rt);
        await sleep(sleepTime);
        const rdValue: number = this.getRegVal(rd);
        await sleep(sleepTime);
        this.setRegVal(rs, rtValue - rdValue);
        await sleep(sleepTime);
      },
    },
  };

  constructor(registerFile: RegisterFile, mspi: number) {
    this.registerFile = registerFile;
    this.mspi = mspi;
  }

  getInstruction(key: string): Instruction {
    return this.instructions[key];
  }
}
