import { MongoDatabase } from "./mongo";

// Import types
import type { Utils } from "src/utils";

export class Databases {
  mongo!: MongoDatabase;

  constructor(utils: Utils) {
    this.mongo = new MongoDatabase(utils);
  }

  async connect() {
    console.log("Mongo Databases - status: connecting");
    await this.mongo.connect();
    console.log("Mongo Databases - status: connected");
  }
}