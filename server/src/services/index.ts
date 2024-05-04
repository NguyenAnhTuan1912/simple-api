// Import services
import { ExampleService } from "./example";
import { AuthService } from "./auth";

//Import types
import type { Databases } from "src/databases";
import type { Utils } from "src/utils";

export class Services {
  example!: ExampleService;
  auth!: AuthService;

  constructor(dbs: Databases, utils: Utils) {
    this.example = new ExampleService(dbs, utils);
    this.auth = new AuthService(dbs, utils);
  }
}