export enum RegisterAccessType {
  READ,
  WRITE,
  RESET,
}

export type RegisterObserver = (num: number, type: RegisterAccessType) => void;

export class Register {
  name: string;
  num: number;
  value: number;
  resetVal: number;
  observer: (RegisterObserver|null) = null;

  constructor(
    name: string,
    number: number,
    value: number,
  ) {
    this.name = name;
    this.num = number;
    this.value = value;
    this.resetVal = value;
  }

  notifyObserver(type: RegisterAccessType): void {
    if (this.observer) {
      this.observer(this.num, type);
    }
  }

  reset(): void {
    this.value = this.resetVal;
    this.notifyObserver(RegisterAccessType.RESET);
  }

  set(value: number): void {
    this.value = value;
    this.notifyObserver(RegisterAccessType.WRITE);
  }

  get(): number {
    this.notifyObserver(RegisterAccessType.READ);
    return this.value;
  }
}
