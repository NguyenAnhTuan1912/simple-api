// Import types
import type { Interchange } from "./data.types";

export type DatabaseTypes = "Mongo";

export interface IDatabase {
  connect(): Promise<void>;
}

export interface IModel<T> {
  query?<Args>(...args: Array<Args>): Promise<Interchange<T | null>>;
  create?<Args>(...args: Array<Args>): Promise<Interchange<T | null>>;
  update?<Args>(...args: Array<Args>): Promise<Interchange<T | null>>;
  delete?<Args>(...args: Array<Args>): Promise<Interchange<T | null>>;
  queryMultiply?<Args>(...args: Array<Args>): Promise<Interchange<Array<T> | null>>;
  createMultiply?<Args>(...args: Array<Args>): Promise<Interchange<T | null>>;
  updateMultiply?<Args>(...args: Array<Args>): Promise<Interchange<T | null>>;
  deleteMultiply?<Args>(...args: Array<Args>): Promise<Interchange<T | null>>;
}