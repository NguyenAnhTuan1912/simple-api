/**
 * Classes in this file are used for inheritance.
 */
import type { Request, Response, NextFunction } from "express";
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Utils } from "src/utils";
import type { Middlewares } from "src/middlewares";

export type HandlerFunction = (req: Request, res: Response, next?: NextFunction) => any;
export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => any;

export class Controller {
  static ReservedMethods = ["constructor", "buildWithMiddlewares"];

  protected dbs!: Databases;
  protected sv!: Services;
  protected utils!: Utils;
  protected midws!: Middlewares;
  withMiddlewares!: Map<string, Array<MiddlewareFunction | HandlerFunction>>;

  constructor(dbs: Databases, sv: Services, utils: Utils, midws: Middlewares) {
    this.dbs = dbs;
    this.sv = sv;
    this.utils = utils;
    this.midws = midws;
    this.withMiddlewares = new Map();

    // Bind all methods
    // Methods will be removed after server is built completely.
    this.utils.Object.bindClassInstance(this, { reservedMethods: Controller.ReservedMethods });
  }

  buildWithMiddlewares(name: string, ...middlewares: Array<MiddlewareFunction | HandlerFunction>) {
    if(!(this as any)[name]) {
      console.log(`Handler [${name}] doesn't exist`);
      return;
    }

    middlewares.push((this as any)[name]);

    this.withMiddlewares.set(name, middlewares);

    delete (Object.getPrototypeOf(this))[name];
  }

  get [Symbol.toStringTag]() {
    return "Controller";
  }
}