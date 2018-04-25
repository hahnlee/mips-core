import * as assert from 'assert';

import {
  RegisterAccessType,
  Register,
  RegisterObserver,
} from '../../hardware';

const registerName: string = '$t0';
const registerNumber: number = 8;
const registerDefaultValue: number = 0;

const register: Register = new Register(
  registerName,
  registerNumber,
  registerDefaultValue,
);

let readCount: number = 0;
let registerValue: (number|null) = null;

const registerObserver: RegisterObserver = (
  num: number,
  type: RegisterAccessType
) => {
  switch(type) {
    case RegisterAccessType.READ:
      readCount++;
      break;
    case RegisterAccessType.WRITE:
      registerValue = register.value;
    case RegisterAccessType.RESET:
      registerValue = register.value;
      break;
    default:
      console.error('out of case');
  }
}

describe('Register', () => {
  describe('init', () => {
    it('register observer callback not called', () => {
      assert.strictEqual(register.name, registerName);
      assert.strictEqual(register.value, registerDefaultValue);
      assert.strictEqual(register.resetVal, registerDefaultValue);
      assert.strictEqual(register.num, registerNumber);
      assert.strictEqual(register.observer, null);
      assert.notStrictEqual(register.value, registerValue);

      register.set(10);
      assert.strictEqual(register.value, 10);
      assert.notStrictEqual(register.value, registerValue);
    });

    it('set observer', () => {
      register.observer = registerObserver;
      assert.strictEqual(register.observer, registerObserver);
    });
  });

  describe('set', () => {
    it('set observer callback called', () => {
      register.set(20);
      assert.strictEqual(register.value, registerValue);
      register.set(30);
      assert.strictEqual(register.value, registerValue);
    });
  });

  describe('get', () => {
    it('get observer callback called', () => {
      // call get
      assert.strictEqual(register.value, register.get());
      assert.strictEqual(register.value, registerValue);
      assert.strictEqual(readCount, 1);

      // again
      assert.strictEqual(register.value, register.get());
      assert.strictEqual(register.value, registerValue);
      assert.strictEqual(readCount, 2);
    });
  });

  describe('reset', () => {
    it('reset observer callback called', () => {
      register.reset();
      assert.strictEqual(register.value, registerDefaultValue);
      assert.strictEqual(register.value, registerValue);
    });
  });
});
