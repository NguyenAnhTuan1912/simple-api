/**
 * Classes in this file are used for inheritance.
 * 
 * Note:
 *   - The project uses `joi` for model's schema. So each model must define a schema.
 */

// Import types
import type { IDatabase } from "src/types/database.types";
import type { Utils } from "src/utils";
import type { ObjectSchema } from "joi";

export class Database<Instances, Utils> implements IDatabase {
  protected instances!: Instances;
  protected localUtils!: Utils;

  constructor(localUtil: Utils) {
    this.instances = {} as any;
    this.localUtils = localUtil;
  }

  async connect(): Promise<void> {};
  get [Symbol.toStringTag]() {
    return "Database";
  }
}

export class Model<T> {
  protected schema!: ObjectSchema<T>;
  protected utils!: Utils;

  constructor(utils: Utils) {
    this.utils = utils;
  }

  async validateDataAsync(data: T) {
    return this.schema.validateAsync(data);
  }

  getFields() {
    return Object.keys(this.schema.describe().keys);
  }

  get [Symbol.toStringTag]() {
    return "Model";
  }
}