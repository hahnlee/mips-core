import * as assert from 'assert';

import {
  AccessType,
  Register,
  RegisterObserver,
} from '../Register';

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

const registerObserver: RegisterObserver = (num: number, type: AccessType) => {
  switch(type) {
    case AccessType.READ:
      readCount++;
      break;
    case AccessType.WRITE:
      registerValue = register.value;
    case AccessType.RESET:
      registerValue = register.value;
      break;
    default:
      console.error('out of case');
  }
}

describe('Register', () => {
  describe('init', () => {
    it('register observer callback not called', () => {
      assert.equal(register.name, registerName);
      assert.equal(register.value, registerDefaultValue);
      assert.equal(register.resetVal, registerDefaultValue);
      assert.equal(register.num, registerNumber);
      assert.equal(register.observer, null);
      assert.notEqual(register.value, registerValue);

      register.set(10);
      assert.equal(register.value, 10);
      assert.notEqual(register.value, registerValue);
    });

    it('set observer', () => {
      register.observer = registerObserver;
      assert.equal(register.observer, registerObserver);
    });
  });

  describe('set', () => {
    it('set observer callback called', () => {
      register.set(20);
      assert.equal(register.value, registerValue);
      register.set(30);
      assert.equal(register.value, registerValue);
    });
  });

  describe('get', () => {
    it('get observer callback called', () => {
      // call get
      assert.equal(register.value, register.get());
      assert.equal(register.value, registerValue);
      assert.equal(readCount, 1);

      // agin
      assert.equal(register.value, register.get());
      assert.equal(register.value, registerValue);
      assert.equal(readCount, 2);
    });
  });

  describe('reset', () => {
    it('reset observer callback called', () => {
      register.reset();
      assert.equal(register.value, registerDefaultValue);
      assert.equal(register.value, registerValue);
    });
  });
});
