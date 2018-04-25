import {
  Instruction,
  InstructionFormat,
} from './Instruction';

import {
  RegisterFile,
} from 'hardware';

export class InstructionSet {
  private registerFile: RegisterFile;

  private getRegVal(registerNum: number): number {
    return this.registerFile.getRegister(registerNum).get();
  }

  private setRegVal(registerNum: number, value: number): void {
    return this.registerFile.getRegister(registerNum).set(value);
  }

  instructions: {[id: string]: Instruction} = {
    'add': {
      format: InstructionFormat.R_FORMAT,
      run: (rs: number, rt: number, rd: number) => {
        const rtValue: number = this.getRegVal(rt);
        const rdValue: number = this.getRegVal(rd);
        this.setRegVal(rs, rtValue + rdValue);
      },
    },
    'addi': {
      format: InstructionFormat.I_FORMAT,
      run: (rs: number, rt: number, imm: number) => {
        const rtValue: number = this.getRegVal(rt);
        this.setRegVal(rs, rtValue + imm);
      },
    },
    'sub': {
      format: InstructionFormat.R_FORMAT,
      run: (rs: number, rt: number, rd: number) => {
        const rtValue: number = this.getRegVal(rt);
        const rdValue: number = this.getRegVal(rd);
        this.setRegVal(rs, rtValue - rdValue);
      },
    },
  };

  constructor(registerFile: RegisterFile) {
    this.registerFile = registerFile;
  }

  getInstruction(key: string): Instruction {
    return this.instructions[key];
  }
}
