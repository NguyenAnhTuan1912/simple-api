/**
 * Classes in this file are used for inheritance.
 * 
 * Note:
 *   - The project uses `joi` for model's schema. So each model must define a schema.
 */

import { Base } from "./Base";

// Import types
import type { IDatabase } from "src/types/database.types";
import type { ObjectSchema } from "joi";

/**
 * A database Manager
 */
export class Database<Instances, Utils> extends Base
  implements IDatabase
{
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

export class Model<D, T> extends Base {
  protected schema!: ObjectSchema<T>;
  protected db!: D;
  protected name!: string;

  constructor(db: D, name: string) {
    super();
    this.db = db;
    this.name = name;
  }

  async validateDataAsync(data: T) {
    return this.schema.validateAsync(data);
  }

  protected getCollection<D, C extends (...args: any[]) => void>
  (get: C) {
    let collection = get(this.db, this.name) as ReturnType<C>;
    return collection;
  }

  getFields() {
    return Object.keys(this.schema.describe().keys);
  }

  get [Symbol.toStringTag]() {
    return "Model";
  }
}