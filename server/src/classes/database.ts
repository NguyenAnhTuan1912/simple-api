/**
 * Classes in this file are used for inheritance.
 * 
 * Note:
 *   - The project uses `joi` for model's schema. So each model must define a schema.
 */

import { Base } from "./Base";

// Import types
import type { IDatabase } from "src/types/database.types";
import type { Utils } from "src/utils";
import type { ObjectSchema } from "joi";

export class Database<Instances, Utils> extends Base implements IDatabase {
  protected instances!: Instances;
  protected localUtils!: Utils;

  constructor(localUtil: Utils) {
    super();
    this.instances = {} as any;
    this.localUtils = localUtil;
  }

  async connect(): Promise<void> {};
  get [Symbol.toStringTag]() {
    return "Database";
  }
}

export class Model<T> extends Base {
  protected schema!: ObjectSchema<T>;

  constructor() {
    super();
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