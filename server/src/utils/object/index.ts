import { Util } from "src/classes/util";

type BindClassInstanceOptions = {
  reservedMethods: Array<string>;
}

export class ObjectUtil extends Util {
  /**
   * Use this method to bind all `i`'s methods. `i` must be an instance from a class.
   * @param i
   */
  bindClassInstance(i: any, options?: BindClassInstanceOptions) {
    if(typeof i !== "object")
      throw new Error("The arg must be an object");

    if(Array.isArray(i))
      throw new Error("The arg cannot be an array");

    if(Object.getPrototypeOf(i) === Object)
      throw new Error("The arg must be an instance of a class");

    const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(i));
    let reservedMethods = options ? options.reservedMethods : ["constructor"];

    for(const methodName of methodNames) {
      if(
        typeof i[methodName] !== "function"
        || methodName in reservedMethods
      ) continue;

      i[methodName] = i[methodName].bind(i);
    }
  }
}