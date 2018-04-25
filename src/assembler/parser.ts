export class Parser {
  registerMap: {[id: string]: number};
  keyword: string[];

  constructor(registerMap: {[id: string]: number}, keyword: string[]) {
    this.registerMap = registerMap;
    this.keyword = keyword;
  }

  getRegisterNum(name: string): (number|Error) {
    const result: (number|undefined) =this.registerMap[name];
    if (result === undefined) {
      throw new Error(`No such register ${name}`);
    }
    return result;
  }

  parse(code: string): (string|number)[][] {
    const result = [];
    const codeLine: string[] = code.split(/\n/);
    for (let row of codeLine) {
      result.push(this.parseLine(row));
    }
    return result;
  }

  parseLine(row: string): (string|number)[] {
    const tokens: string[] = row.split(' ');
    const result = [];
    for (let token of tokens) {
      token = token.split(',')[0];

      // skip multiple space
      if (!token) {
        continue;
      }

      // comments
      if (token.startsWith('#')) {
        break;
      }

      // register
      if (token.startsWith('$')) {
        result.push(this.getRegisterNum(token));
        continue;
      }

      // label
      if (token.endsWith(':')) {
        throw new Error('label not support now');
      }

      // sw/lw
      if (token.includes('(')) {
        throw new Error('sw/lw not support now');
      }

      if (this.keyword.includes(token)) {
        result.push(token);
        continue;
      }

      result.push(parseInt(token, 10));
    }
    return result;
  }
}
