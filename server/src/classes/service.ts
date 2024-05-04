/**
 * Classes in this file are used for inheritance.
 */

// Import types
import type { Databases } from "src/databases";
import type { Utils } from "src/utils";

export class Service {
  protected dbs!: Databases;
  protected utils!: Utils;

  constructor(dbs: Databases, utils: Utils) {
    this.dbs = dbs;
    this.utils = utils;
  }

  get [Symbol.toStringTag]() {
    return "Service";
  }
}