import { AuthorizeMiddleware } from "./authorize";

// Import types
import type { Utils } from "src/utils";

export class Middlewares {
  Authorize!: AuthorizeMiddleware;
  
  constructor(utils: Utils) {
    this.Authorize = new AuthorizeMiddleware(utils);
  }
}