// Import types
import type { Utils } from "src/utils";
import type { Databases } from "src/databases";
import type { Services } from "src/services";

export class Middleware {
  utils!: Utils;
  dbs!: Databases;
  serv!: Services;

  constructor(dbs: Databases, serv: Services, utils: Utils) {
    this.utils = utils;
    this.dbs = dbs;
    this.serv = serv;

    this.utils.object.bindClassInstance(this);
  }

  get [Symbol.toStringTag]() {
    return "Middleware";
  }
}