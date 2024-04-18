import { Database } from "../../classes/database";

// Import models
import { ExampleModel } from "./models/example.model";

export class MongoDatabase extends Database {
  example!: ExampleModel;

  constructor() {
    super();
    this.example = new ExampleModel();
  }

  async connect(): Promise<void> {
      
  }
}