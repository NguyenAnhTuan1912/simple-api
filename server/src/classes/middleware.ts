import type { Utils } from "src/utils";

export class Middleware {
  utils!: Utils;

  constructor(utils: Utils) {
    this.utils = utils;

    this.utils.Object.bindClassInstance(this);
  }

  get [Symbol.toStringTag]() {
    return "Middleware";
  }
}