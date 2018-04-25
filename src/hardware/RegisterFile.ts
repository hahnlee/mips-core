import {
  Register,
  RegisterObserver,
} from './register';

export class RegisterFile {
  registerList: Register[] = [];

  constructor(registerMap: {[id: string]: number}) {
    for(let key in registerMap) {
      const num = registerMap[key];
      this.registerList[num] = new Register(key, num, 0);
    }
  }

  getRegister(num: number): Register {
    return this.registerList[num];
  }

  setObserver(observer: RegisterObserver): void {
    for (const register of this.registerList) {
      register.observer = observer;
    }
  }
}
