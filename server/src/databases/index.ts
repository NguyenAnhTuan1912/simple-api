import { MongoDatabase } from "./mongo";

export class Databases {
  mongo!: MongoDatabase;

  constructor() {
    this.mongo = new MongoDatabase();
  }

  async connect() {
    
  }
}