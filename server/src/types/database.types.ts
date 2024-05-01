// Import types
import type { Interchange } from "./data.types";

export type DatabaseTypes = "Mongo";

export interface IDatabase {
  connect(): Promise<void>;
}

export interface IModel<T> {
  query?(...args: Array<any>): Promise<Interchange<T | null>>;
  create?(...args: Array<any>): Promise<Interchange<T | null>>;
  update?(...args: Array<any>): Promise<Interchange<T | null>>;
  delete?(...args: Array<any>): Promise<Interchange<T | null>>;
  queryMultiply?(...args: Array<any>): Promise<Interchange<Array<T> | null>>;
  createMultiply?(...args: Array<any>): Promise<Interchange<T | null>>;
  updateMultiply?(...args: Array<any>): Promise<Interchange<T | null>>;
  deleteMultiply?(...args: Array<any>): Promise<Interchange<T | null>>;
}