import * as assert from 'assert';

import {
  RegisterAccessType,
  RegisterObserver,
  RegisterFile,
} from '../../hardware';

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

const registerObject: number[] = [];

let readCount: number = 0;

const registerObserver: RegisterObserver = (
  num: number,
  type: RegisterAccessType,
) => {
  switch (type) {
    case RegisterAccessType.WRITE:
    case RegisterAccessType.RESET:
      registerObject[num] = registerFile.registerList[num].value;
      break;
    case RegisterAccessType.READ:
      readCount++;
      break;
  }
}

registerFile.setObserver(registerObserver);

describe('RegisterFile', () => {
  it('Muiltiple register work', () => {
    let registerNum: number = 0;
    let registerValue: number = 10;
    registerFile.getRegister(registerNum).set(registerValue);
    assert.strictEqual(registerObject[registerNum], registerValue);

    registerNum = 31;
    registerValue = 20;
    registerFile.getRegister(registerNum).set(registerValue);
    assert.strictEqual(registerObject[registerNum], registerValue);
  });
});
