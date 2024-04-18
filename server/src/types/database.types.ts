export interface IDatabase {
  connect(): Promise<void>;
}

export interface IModel<T> {
  query?<Args>(...args: Array<Args>): Promise<T>;
  create?<Args>(...args: Array<Args>): Promise<T>;
  update?<Args>(...args: Array<Args>): Promise<T>;
  delete?<Args>(...args: Array<Args>): Promise<T>;
  queryMultiply?<Args>(...args: Array<Args>): Promise<T>;
  createMultiply?<Args>(...args: Array<Args>): Promise<T>;
  updateMultiply?<Args>(...args: Array<Args>): Promise<T>;
  deleteMultiply?<Args>(...args: Array<Args>): Promise<T>;
}