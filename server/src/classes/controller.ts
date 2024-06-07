/**
 * Classes in this file are used for inheritance.
 */
import { Base } from "./Base";

// Import types
import type { Request, Response, NextFunction } from "express";
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";
import type { Permissions } from "src/types/auth.types";
import type { HTTPResponse } from "src/types/http.types";

export type HandlerFunction = (req: Request, res: Response, next?: NextFunction) => any;
export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => any;

export class Controller extends Base {
  static ReservedMethods = ["constructor", "buildWithMiddlewares"];
  static MethodsToActions = {
    GET: "read",
    POST: "write",
    PATCH: "update",
    PUT: "updateFull",
    DELETE: "delete"
  };

  protected dbs!: Databases;
  protected serv!: Services;
  protected midws!: Middlewares;
  withMiddlewares!: Map<string, Array<MiddlewareFunction | HandlerFunction>>;

  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super();
    this.dbs = dbs;
    this.serv = serv;
    this.midws = midws;
    this.withMiddlewares = new Map();

    // Bind all methods
    // Methods will be removed after server is built completely.
    this.utils.object.bindClassInstance(this, { reservedMethods: Controller.ReservedMethods });
  }

  /**
   * Use this method to check permissions of a handler. If permissions don't match with
   * requirements, there is error will be threw.
   * @param req 
   * @param resource 
   * @param permissions 
   */
  checkPermissions<T>(
    req: Request,
    resource: string,
    permissions: Permissions,
    result: HTTPResponse<T>
  ) {
    result.error!.code = 403;

    if(!permissions.resources.includes(resource))
      throw new Error("You don't have any permissions to use this resource");

    let allowedActions = Controller.MethodsToActions[req.method as keyof typeof Controller.MethodsToActions];
    let checkActions = Boolean(permissions.actions[allowedActions]);
    
    if(!checkActions)
      throw new Error("You don't have any permissions to do this action");

    return true;
  }

  /**
   * Use this method to build a handler with middlewares. By default, handler will be build standalone,
   * when use this method, all middlewares will be arranged before the handler.
   * @param name 
   * @param middlewares 
   * @returns 
   */
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