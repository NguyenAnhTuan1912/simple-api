import { AuthorizationMiddleware } from "./authorization";

// Import types
import type { Utils } from "src/utils";
import type { Databases } from "src/databases";
import type { Services } from "src/services";

export class Middlewares {
  authorization!: AuthorizationMiddleware;
  
  constructor(dbs: Databases, serv: Services, utils: Utils) {
    this.authorization = new AuthorizationMiddleware(dbs, serv, utils);
  }
}