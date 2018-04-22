export enum AccessType {
  READ,
  WRITE,
  RESET,
}

export type RegisterObserver = (num: number, type: AccessType) => void;

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

  notifyObserver(type: AccessType): void {
    if (this.observer) {
      this.observer(this.num, type);
    }
  }

  reset(): void {
    this.value = this.resetVal;
    this.notifyObserver(AccessType.RESET);
  }

  set(value: number) {
    this.value = value;
    this.notifyObserver(AccessType.WRITE);
  }

  get(): number {
    this.notifyObserver(AccessType.READ);
    return this.value;
  }

}
