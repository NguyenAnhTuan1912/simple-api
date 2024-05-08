/**
 * Classes in this file are used for inheritance.
 */
import { Base } from "./Base";

// Import types
import type { Express } from "express";
import type { Controller, MiddlewareFunction, HandlerFunction } from "./Controller";
import type { HTTPMethods } from "src/types/http.types";
import type { Middlewares } from "src/middlewares";

export class Module extends Base {
  protected base!: string;
  protected controllers!: {[key: string]: Controller};
  protected midws!: Middlewares;

  constructor(base: string, midws: Middlewares) {
    super();
    this.base = base;
    this.midws = midws;
    this.controllers = {};
  }

  /**
   * Use this method to append handler(s) to Express's instance with its `use()` method.
   * This method is used with `Module.buildEndPoints`.
   * @param app 
   * @param handlerName 
   * @param hander 
   * @returns 
   */
  appendHandler(
    app: Express,
    handlerName: string,
    hander: HandlerFunction | Array<MiddlewareFunction | HandlerFunction>
  ) {
    let [method, name] = handlerName.split("::") as [HTTPMethods, string];

    if(!this.utils.http.isValidHTTPMethod(method) || !Boolean(app[method])) {
      console.log(`  Endpoint - ${name} - has invalid http method`);
      return;
    }

    if(name[0] !== "/" && name !== "") name = "/" + name;
    let path = this.base + name;

    app[method](path, hander);
    console.log(`  Endpoint - ${path}, method: ${method} - Done`);
  }

  /**
   * Use this method to automatically build endpoints from controllers as long as you write a handler with
   * some defined roles:
   *   - The name of handle should be `<http method>::<actual name>` format and place in `[]`, for example `[get::user]`. Remember,
   * If an endpoint has parameter, it's actual name should be `<name_1/:param1/name_2/:param2>`.
   *   - If you want to use __middleware(s)__ with some methods, you should use `Controller.buildWithMiddlewares(name, ...middlewares)`
   * method.
   * @param app 
   * @example
   * ```ts
   * class Example extends Controller {
   *   constructor(dbs: Databases, sv: Services, utils: Utils, midws: Middlewares) {
   *     super(dbs, sv, utils, midws);
   * 
   *     // Composite middlewares
   *     this.buildWithMiddlewares("post::user", this.midws.authorize.user);
   *   }
   * 
   *   async ["get::user"]() { ... };
   *   async ["post::user"]() { ... }; // User must be authorized to use this endpoint.
   * }
   * ```
   */
  buildEndPoints(app: Express) {
    let controllerNames = Object.keys(this.controllers);
    console.log("In module: ExampleModule, endpoints are being built...");
    
    for(const controllerName of controllerNames) {
      console.log(`Status - ${controllerName} - Building...`);
      let handlerNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this.controllers[controllerName]));

      // "Without middlewares" handlers
      for(const handlerName of handlerNames) {
        if(
          // Isn't function or constructor
          typeof (this.controllers[controllerName] as any)[handlerName] !== "function"
          || handlerName === "constructor"
        ) continue;

        this.appendHandler(app, handlerName, (this.controllers[controllerName] as any)[handlerName]);
        delete (this.controllers[controllerName] as any)[handlerName];
      }

      // "With middlewares" handlers
      let withMiddlewaresEntries = this.controllers[controllerName].withMiddlewares.entries();
      
      for(const [handlerName, handler] of withMiddlewaresEntries) {
        this.appendHandler(app, handlerName, handler);
      }

      console.log(`Status - ${controllerName} - Done`);
    }
  }

  get [Symbol.toStringTag]() {
    return "Module";
  }
}