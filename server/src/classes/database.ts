/**
 * Classes in this file are used for inheritance.
 */

// Import types
import { IDatabase } from "src/types/database.types";

export class Database implements IDatabase {
  async connect(): Promise<void> {};
  get [Symbol.toStringTag]() {
    return "Database";
  }
}

export class Model {
  get [Symbol.toStringTag]() {
    return "Model";
  }
}