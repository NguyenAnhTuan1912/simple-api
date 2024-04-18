import { Module } from "src/classes/module";

import { ExampleController } from "src/controllers/example.controller";
import { Utils } from "src/utils";

// Import types
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";


export class ExampleModule extends Module {
  constructor(db: Databases, sv: Services, utils: Utils, midws: Middlewares) {
    super("/example", utils, midws);
    this.controllers = {
      example: new ExampleController(db, sv, utils, midws)
    };
  }
}