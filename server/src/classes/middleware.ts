import { Base } from "./Base";

// Import types
import type { Databases } from "src/databases";
import type { Services } from "src/services";

/**
 * A base class of middleware
 */
export class Middleware extends Base {
  dbs!: Databases;
  serv!: Services;

  constructor(dbs: Databases, serv: Services) {
    super();
    this.dbs = dbs;
    this.serv = serv;

    this.utils.object.bindClassInstance(this);
  }

  get [Symbol.toStringTag]() {
    return "Middleware";
  }
}