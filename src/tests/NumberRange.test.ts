import NumberRange from '../NumberRange';

describe('NumberRange', () => {
  describe('constructor', () => {
    describe('should', () => {
      test('throw error when min is greater than max', () => {
        expect(() => {
          new NumberRange(1, 0);
        }).toThrow();
      });

      test('create an immutable object by default', () => {
        const nr = new NumberRange(0, 1);
        expect(nr.isMutable()).toBe(false);
        expect(() => {
          nr.isMutable = function () {
            return true;
          };
        }).toThrow();
      });

      test('be able to create a mutable object', () => {
        const nr = new NumberRange(0, 1, true);
        expect(nr.isMutable()).toBe(true);
        expect(() => {
          nr.isMutable = function () {
            return true;
          };
        }).not.toThrow();
      });
    });
  });

  describe('setMin', () => {
    const min = 5,
      max = 10,
      immut = new NumberRange(min, max),
      mut = new NumberRange(min, max, true);

    describe(`(min=${min}, max=${max}) should`, () => {
      assertThrows(immut, max - 1);
      assertThrows(mut, max + 1);

      assertSuccess(mut, min - 1);
      assertSuccess(mut, min);
      assertSuccess(mut, max);
    });

    function assertThrows(range: NumberRange, value: number) {
      test(`throw when value=${value}, isMutable=${range.isMutable()}`, () => {
        expect(() => range.setMin(value)).toThrow();
      });
    }
    function assertSuccess(range: NumberRange, value: number) {
      test(`succeed when value=${value}, isMutable=${range.isMutable()}`, () => {
        range.setMin(value);
        expect(range.getMin()).toBe(value);
      });
    }
  });

  describe('setMax', () => {
    const min = 5,
      max = 10,
      immut = new NumberRange(min, max),
      mut = new NumberRange(min, max, true);

    describe(`(min=${min}, max=${max}) should`, () => {
      assertThrows(immut, min + 1);
      assertThrows(mut, min - 1);

      assertSuccess(mut, min + 1);
      assertSuccess(mut, min);
      assertSuccess(mut, max);
    });

    function assertThrows(range: NumberRange, value: number) {
      test(`throw when value=${value}, isMutable=${range.isMutable()}`, () => {
        expect(() => range.setMax(value)).toThrow();
      });
    }
    function assertSuccess(range: NumberRange, value: number) {
      test(`succeed when value=${value}, isMutable=${range.isMutable()}`, () => {
        range.setMax(value);
        expect(range.getMax()).toBe(value);
      });
    }
  });

  describe('containsInt', () => {
    const min = 5,
      max = 10,
      range = new NumberRange(min, max);

    describe(`(min=${min}, max=${max}) should return`, () => {
      assert(min, true);
      assert((min + max) / 2, true);
      assert(max, true);
      assert(min - 1, false);
      assert(max + 1, false);
    });

    function assert(value: number, expected: boolean) {
      test(`${expected} when value=${value}`, () => {
        expect(range.containsInt(value)).toBe(expected);
      });
    }
  });

  describe('containsFloat', () => {
    const min = 0.1,
      max = 0.3,
      range = new NumberRange(min, max);

    describe(`(min=${min}, max=${max}) should return`, () => {
      assertDefaultRounding(min, true);
      assertDefaultRounding((min + max) / 2, true);
      assertDefaultRounding(max, true);
      assertDefaultRounding(min - 1, false);
      assertDefaultRounding(max + 1, false);
      assertDefaultRounding(0.1 + 0.2, true); // max boundary
      assertDefaultRounding(min - 0.0005, false); // min boundary

      assertCustomRounding(min, 1, true);
      assertCustomRounding((min + max) / 2, 1, true);
      assertCustomRounding(max, 1, true);
      assertCustomRounding(min - 1, 1, false);
      assertCustomRounding(min - 0.001, 1, true);
      assertCustomRounding(max + 1, 1, false);
      assertCustomRounding(max + 0.01, 1, true);
      assertCustomRounding(0.1 + 0.2001, 3, true); // max boundary
      assertCustomRounding(0.1 + 0.2009, 3, false); // max boundary
      assertCustomRounding(min - 0.0005, 2, true);
      assertCustomRounding(min - 0.0005, 2, true);
    });

    function assertDefaultRounding(value: number, expected: boolean) {
      test(`${expected} when value=${value} (default rounding)`, () => {
        expect(range.containsFloat(value)).toBe(expected);
      });
    }
    function assertCustomRounding(
      value: number,
      decimalPlaces: number,
      expected: boolean,
    ) {
      test(`${expected} when value=${value}, decimalPlaces=${decimalPlaces}`, () => {
        expect(range.containsFloat(value, decimalPlaces)).toBe(expected);
      });
    }
  });
});
