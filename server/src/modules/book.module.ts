import { Module } from "src/classes/Module";

import { BookController } from "src/controllers/book.controller";

// Import utils
import { Utils } from "src/utils";

// Import types
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";

export class BookModule extends Module {
  constructor(dbs: Databases, serv: Services, utils: Utils, midws: Middlewares) {
    super("/books", utils, midws);
    this.controllers = {
      book: new BookController(dbs, serv, utils, midws)
    };
  }
}