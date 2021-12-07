export default class NumberRange {
  private _min: number;
  private _max: number;
  private readonly _isMutable: boolean;

  /**
   * Creates a new NumberRange.
   * @param min The minimum.
   * @param max The maximum.
   * @param isMutable Determines if object can be mutated after being created. Defaults to false.
   */
  constructor(min: number, max: number, isMutable = false) {
    if (min > max) {
      throw new Error(
        `cannot construct: min (${min}) must be greater than max (${max})`,
      );
    }

    this._min = min;
    this._max = max;

    this._isMutable = isMutable;
    if (!isMutable) {
      Object.freeze(this);
    }
  }

  /**
   * @returns The minimum.
   */
  public getMin() {
    return this._min;
  }

  /**
   * @returns The maximum.
   */
  public getMax() {
    return this._max;
  }

  /**
   * @returns True if object is mutable, false otherwise.
   */
  public isMutable() {
    return this._isMutable;
  }

  /**
   * Updates minimum. Throws error if object is immutable.
   * @param value The new min.
   * @returns this.
   */
  public setMin(value: number) {
    if (!this._isMutable) {
      throw new Error(`cannot set min to ${value}: object is immutable`);
    }
    if (value > this._max) {
      throw new Error(
        `cannot set min to ${value}: value must be <= the current max (${this._max})`,
      );
    }

    this._min = value;
    return this;
  }

  /**
   * Updates maximum. Throws error if object is immutable.
   * @param value The new max.
   * @returns this.
   */
  public setMax(value: number) {
    if (!this._isMutable) {
      throw new Error(`cannot set max to ${value}: object is immutable`);
    }
    if (value < this._min) {
      throw new Error(
        `cannot set max to ${value}: value must be >= the current min (${this._min})`,
      );
    }

    this._max = value;
    return this;
  }

  /**
   * Checks if `int` exists inclusively within the range. For floating-point numbers, use `containsFloat` instead.
   * @param int The number to check.
   * @returns True if `int` exists inclusively between `min` and `max`, false otherwise.
   */
  public containsInt(int: number) {
    return int >= this._min && int <= this._max;
  }

  /**
   * Checks if `float` exists inclusively within the range.
   * @param float The number to check.
   * @param decimalPlaces The number of decimal places to round `float` to. Defaults to 15.
   * @returns True if `float` exists inclusively between `min` and `max` with the given precision, false otherwise.
   */
  public containsFloat(float: number, decimalPlaces = 15) {
    const roundedFloat = parseFloat(float.toPrecision(decimalPlaces));
    return roundedFloat >= this._min && roundedFloat <= this._max;
  }
}
