import { AuthorizationMiddleware } from "./authorization";

// Import types
import type { Databases } from "src/databases";
import type { Services } from "src/services";

export class Middlewares {
  authorization!: AuthorizationMiddleware;
  
  constructor(dbs: Databases, serv: Services) {
    this.authorization = new AuthorizationMiddleware(dbs, serv);
  }
}