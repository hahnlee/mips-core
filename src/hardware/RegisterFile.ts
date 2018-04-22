import {
  Register,
  RegisterObserver,
} from './Register';

export class RegisterFile {
  registerList: Register[] = [
    new Register('$zero', 0, 0),
    new Register('$at', 1, 0),
    new Register('$v0', 2, 0),
    new Register('$v1', 3, 0),
    new Register('$a0', 4, 0),
    new Register('$a1', 5, 0),
    new Register('$a2', 6, 0),
    new Register('$a3', 7, 0),
    new Register('$t0', 8, 0),
    new Register('$t1', 9, 0),
    new Register('$t2', 10, 0),
    new Register('$t3', 11, 0),
    new Register('$t4', 12, 0),
    new Register('$t5', 13, 0),
    new Register('$t6', 14, 0),
    new Register('$t7', 15, 0),
    new Register('$s0', 16, 0),
    new Register('$s1', 17, 0),
    new Register('$s2', 18, 0),
    new Register('$s3', 19, 0),
    new Register('$s4', 20, 0),
    new Register('$s5', 21, 0),
    new Register('$s6', 22, 0),
    new Register('$s7', 23, 0),
    new Register('$t8', 24, 0),
    new Register('$t9', 25, 0),
    new Register('$k0', 26, 0),
    new Register('$k1', 27, 0),
    new Register('$gp', 28, 0),
    new Register('$sp', 29, 0),
    new Register('$fp', 30, 0),
    new Register('$ra', 31, 0),
  ];

  getRegister(num: number): Register {
    return this.registerList[num];
  }

  setObserver(observer: RegisterObserver): void {
    for (const register of this.registerList) {
      register.observer = observer;
    }
  }
}
