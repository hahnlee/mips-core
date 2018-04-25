import * as assert from 'assert';

import { Parser } from '../../assembler';

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

const keyword: string[] = [
  'add',
  'addi',
  'sub',
];

const parser = new Parser(registerMap, keyword);

describe('Parser', () => {
  it('check collect parse', () => {
    const asm: string[] = [
      'add $t0, $t0, $zero # Test Comment',
      'addi $t0,                  $t0, -3',
      'sub $t0, $t0 $t1',
    ];

    const result: (string|number)[][] = parser.parse(asm.join('\n'));
    assert.strictEqual(result.length, asm.length);

    for (let row of result) {
      assert.strictEqual(row.length, 4);
    }

    // line 1
    assert.strictEqual(result[0][0], 'add');
    assert.strictEqual(result[0][1], registerMap['$t0']);
    assert.strictEqual(result[0][2], registerMap['$t0']);
    assert.strictEqual(result[0][3], registerMap['$zero']);

    // line2
    assert.strictEqual(result[1][0], 'addi');
    assert.strictEqual(result[1][1], registerMap['$t0']);
    assert.strictEqual(result[1][2], registerMap['$t0']);
    assert.strictEqual(result[1][3], -3);

    // line3
    assert.strictEqual(result[2][0], 'sub');
    assert.strictEqual(result[2][1], registerMap['$t0']);
    assert.strictEqual(result[2][2], registerMap['$t0']);
    assert.strictEqual(result[2][3], registerMap['$t1']);
  });

  it('throw except when unsupported operation', () => {
    assert.throws(() => {
      parser.parse('LOOP:');
    });

    assert.throws(() => {
      parser.parse('lw($t0)');
    });

    assert.throws(() => {
      parser.parse('add $t20, $t30, $40');
    });
  });
});
