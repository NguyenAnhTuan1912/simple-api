export type Interchange<T> = {
  /**
   * Values of code is `0` or `1`
   */
  code: number;
  message: string | null;
  data: T | null;
}