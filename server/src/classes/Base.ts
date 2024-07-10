// Import utils
import { Utils } from "src/utils";

// import types
import type { Request, Response } from "express";
import type { HTTPResponse } from "src/types/http.types";
import type { Interchange } from "src/types/data.types";

/**
 * A base class, every class in this project starts from here
 */
export class Base {
  utils!: Utils;

  /**
   * Use this function to wrap a function that can cause errors. The result of this function
   * is `HTTPResponse` so it's suitable to use with controller's handlers.
   * @param ctx 
   * @param fn 
   * @returns 
   */
  async handleResponseError<T, C>(
    ctx: C,
    res: Response,
    fn: (this: C, result: HTTPResponse<T>) => Promise<HTTPResponse<T>>
  ) {
    let result = this.utils.http.generateHTTPResponse<T>(200);
    
    try {
      result = await fn.call(ctx, result);
    } catch (error: any) {
      let code = result.code === 200 ? 500 : result.code;
      result = this.utils.http.generateHTTPResponse<T>(code, undefined, error.message);
    } finally {
      return res.status(result.error ? result.code : result.code).json(result);
    }
  }

  /**
   * Use this function to wrap a function that can cause errors. The result of this function
   * is `Interchange` so it's suitable to use with some local components.
   * @param ctx 
   * @param fn 
   * @returns 
   */
  async handleInterchangeError<T, C>(
    ctx: C,
    fn: (this: C, result: Interchange<T>) => Promise<Interchange<T>> | Interchange<T>
  ) {
    let result = this.utils.http.generateInterchange<T>(1);
    
    try {
      let maybePromisedData = fn.call(ctx, result);
      // If function is an async function
      if(maybePromisedData instanceof Promise)
        result = await maybePromisedData;
      else 
        result = maybePromisedData;
    } catch (error: any) {
      result.code = 0;
      result.message = error.message;
    } finally {
      return result;
    }
  }
}

Base.prototype.utils = new Utils();