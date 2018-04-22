import * as assert from 'assert';

import {
  AccessType,
  RegisterObserver,
} from '../Register';

import {
  RegisterFile,
} from '../RegisterFile';

const registerFile: RegisterFile = new RegisterFile();

const registerObject: number[] = [];

let readCount: number = 0;

const registerObserver: RegisterObserver = (num: number, type: AccessType) => {
  switch (type) {
    case AccessType.WRITE:
    case AccessType.RESET:
      registerObject[num] = registerFile.getRegister(num).value;
      break;
    case AccessType.READ:
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
    assert.equal(registerObject[registerNum], registerValue);

    registerNum = 31;
    registerValue = 20;
    registerFile.getRegister(registerNum).set(registerValue);
    assert.equal(registerObject[registerNum], registerValue);
  });
});
