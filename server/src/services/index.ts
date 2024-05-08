import { Base } from "src/classes/Base";

// Import services
import { AuthService } from "./auth";

//Import types
import type { Databases } from "src/databases";

export class Services {
  auth!: AuthService;

  constructor(dbs: Databases) {
    this.auth = new AuthService(dbs);
  }
}