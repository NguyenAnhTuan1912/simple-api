import { Module } from "src/classes/Module";

import { TokenController } from "src/controllers/token.controller";

// Import types
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";

export class AuthModule extends Module {
  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super("/auth", midws);
    this.controllers = {
      token: new TokenController(dbs, serv, midws)
    };
  }
}