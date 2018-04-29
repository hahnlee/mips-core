import * as assert from 'assert';

import { RegisterFile } from '../../hardware'

import { InstructionSet } from '../../instruction';

const registerMap: {[id: string]: number} = {
  '$zero': 0,
  '$at': 1,
  '$v0': 2,
  '$v1': 3,
  '$a0': 4,
  '$a1': 5,
  '$a2': 6,
  '$a3': 7,
  '$t0': 8,
  '$t1': 9,
  '$t2': 10,
  '$t3': 11,
  '$t4': 12,
  '$t5': 13,
  '$t6': 14,
  '$t7': 15,
  '$s0': 16,
  '$s1': 17,
  '$s2': 18,
  '$s3': 19,
  '$s4': 20,
  '$s5': 21,
  '$s6': 22,
  '$s7': 23,
  '$t8': 24,
  '$t9': 25,
  '$k0': 26,
  '$k1': 27,
  '$gp': 28,
  '$sp': 29,
  '$fp': 30,
  '$ra': 31,
};

const registerFile: RegisterFile = new RegisterFile(registerMap);
const instructionSet: InstructionSet = new InstructionSet(registerFile, 100);

describe('InstructionSet', () => {
  it('add', async () => {
    const rs: number = 16;
    const rt: number = 17;
    const rd: number = 18;

    const rtVal: number = 12;
    const rdVal: number = 30;

    registerFile.getRegister(rt).set(rtVal);
    registerFile.getRegister(rd).set(rdVal);

    await instructionSet.getInstruction('add').run(rs, rt, rd);

    assert.strictEqual(registerFile.getRegister(rs).value, rtVal + rdVal);
    assert.strictEqual(registerFile.getRegister(rt).value, rtVal);
    assert.strictEqual(registerFile.getRegister(rd).value, rdVal);
  });

  it('addi', async () => {
    const rs: number = 16;
    const rt: number = 17;
    const imm: number = 100;
  
    const rtVal: number = registerFile.getRegister(rt).value;

    await instructionSet.getInstruction('addi').run(rs, rt, imm);

    assert.strictEqual(registerFile.getRegister(rs).value, rtVal + imm);
  });

  it('sub', async () => {
    const rs: number = 16;
    const rt: number = 17;
    const rd: number = 18;

    const rtVal: number = 46;
    const rdVal: number = 4;

    registerFile.getRegister(rt).set(rtVal);
    registerFile.getRegister(rd).set(rdVal);

    await instructionSet.getInstruction('sub').run(rs, rt, rd);

    assert.strictEqual(registerFile.getRegister(rs).value, rtVal - rdVal);
    assert.strictEqual(registerFile.getRegister(rt).value, rtVal);
    assert.strictEqual(registerFile.getRegister(rd).value, rdVal);
  });
});
