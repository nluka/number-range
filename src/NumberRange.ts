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
      throw new Error(`'min' (${min}) cannot be greater than 'max' (${max})`);
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
   * @returns True if object is mutable, false if it is not.
   */
  public isMutable() {
    return this._isMutable;
  }

  /**
   * Updates minimum. Throws an error is object is immutable.
   * @param value The new min.
   * @returns `this` if successful.
   */
  public setMin(value: number) {
    if (!this._isMutable) {
      throw new Error(
        `cannot set 'min' to ${value} because object is immutable`,
      );
    }
    if (value > this._max) {
      throw new Error(
        `min cannot be set to ${value} because it must be <= the current max (${this._max})`,
      );
    }

    this._min = value;
    return this;
  }

  /**
   * Updates maximum. Throws an error is object is immutable.
   * @param value The new max.
   * @returns `this` if successful.
   */
  public setMax(value: number) {
    if (!this._isMutable) {
      throw new Error(
        `cannot set 'max' to ${value} because object is immutable`,
      );
    }
    if (value < this._min) {
      throw new Error(
        `max cannot be set to ${value} because it must be >= the current min (${this._min})`,
      );
    }

    this._max = value;
    return this;
  }

  /**
   * Checks if `int` exists inclusively within the range. For floating-point numbers, use `containsFloat` instead.
   * @param int The number to check.
   * @returns true if `int` exists inclusively between `min` and `max`, false otherwise.
   */
  public containsInt(int: number) {
    return int >= this._min && int <= this._max;
  }

  /**
   * Checks if `float` exists inclusively within the range.
   * @param float The number to check.
   * @param decimalPlaces The number of decimal places to round `float` to. Defaults to 15.
   * @returns true if `float` exists inclusively between `min` and `max` with the given precision, false otherwise.
   */
  public containsFloat(float: number, decimalPlaces = 15) {
    return (
      parseFloat(float.toPrecision(decimalPlaces)) >= this._min &&
      parseFloat(float.toPrecision(decimalPlaces)) <= this._max
    );
  }
}
