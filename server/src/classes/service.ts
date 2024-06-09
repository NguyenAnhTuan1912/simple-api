/**
 * Classes in this file are used for inheritance.
 */
import { Base } from "./Base";

// Import types
import type { Databases } from "src/databases";

/**
 * A base class of service
 */
export class Service extends Base {
  protected dbs!: Databases;

  constructor(dbs: Databases) {
    super();
    this.dbs = dbs;
  }

  get [Symbol.toStringTag]() {
    return "Service";
  }
}