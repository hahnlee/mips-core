export enum InstructionFormat {
  R_FORMAT,
  I_FORMAT,
};

export type Instruction = {
  format: InstructionFormat,
  run(rs: number, rt: number, etc?: number): void,
};
