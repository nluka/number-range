# nluka-number-range

## Installing

`npm install nluka-number-range`

## Documentation

```ts
export default class NumberRange {
  private _min;
  private _max;
  private readonly _isMutable;

  /**
   * Creates a new NumberRange.
   * @param min The minimum.
   * @param max The maximum.
   * @param isMutable Determines if object can be mutated after being created. Defaults to false.
   */
  constructor(min: number, max: number, isMutable?: boolean);

  /**
   * @returns The minimum.
   */
  getMin(): number;

  /**
   * @returns The maximum.
   */
  getMax(): number;

  /**
   * @returns True if object is mutable, false otherwise.
   */
  isMutable(): boolean;

  /**
   * Updates minimum. Throws error if object is immutable.
   * @param value The new min.
   * @returns this.
   */
  setMin(value: number): this;

  /**
   * Updates maximum. Throws error if object is immutable.
   * @param value The new max.
   * @returns this.
   */
  setMax(value: number): this;

  /**
   * Checks if `int` exists inclusively within the range. For floating-point numbers, use `containsFloat` instead.
   * @param int The number to check.
   * @returns True if `int` exists inclusively between `min` and `max`, false otherwise.
   */
  containsInt(int: number): boolean;

  /**
   * Checks if `float` exists inclusively within the range.
   * @param float The number to check.
   * @param decimalPlaces The number of decimal places to round `float` to. Defaults to 15.
   * @returns True if `float` exists inclusively between `min` and `max` with the given precision, false otherwise.
   */
  containsFloat(float: number, decimalPlaces?: number): boolean;
}
```
