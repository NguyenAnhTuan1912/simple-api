// Import utils
import { Utils } from "src/utils";

// import types
import type { Request, Response } from "express";
import type { HTTPResponse } from "src/types/http.types";
import type { Interchange } from "src/types/data.types";

export class Base {
  utils!: Utils;

  /**
   * Use this function to wrap a function that can cause errors. The result of this function
   * is `HTTPResponse` so it's suitable to use with controller's handlers.
   * @param ctx 
   * @param fn 
   * @returns 
   */
  async handleErrorWithHTTPResponseAsResult<T, C>(
    ctx: C,
    res: Response,
    fn: (this: C, result: HTTPResponse<T>) => Promise<HTTPResponse<T>>
  ) {
    let result = this.utils.http.generateHTTPResponse<T>(200);
    
    try {
      result = await fn.call(ctx, result);
    } catch (error: any) {
      result.error!.code = result.error!.code === 200 ? 500 : result.error!.code;
      result.error!.message = error.message;
    } finally {
      return res.status(result.error ? result.error.code : result.success!.code).json(result);
    }
  }

  /**
   * Use this function to wrap a function that can cause errors. The result of this function
   * is `Interchange` so it's suitable to use with some local components.
   * @param ctx 
   * @param fn 
   * @returns 
   */
  async handleErrorWithInterchangeAsResult<T, C>(
    ctx: C,
    fn: (this: C, result: Interchange<T>) => Promise<Interchange<T>>
  ) {
    let result = this.utils.http.generateInterchange<T>(1);
    
    try {
      result = await fn.call(ctx, result);
    } catch (error: any) {
      result.code = 0;
      result.message = error.message;
    } finally {
      return result;
    }
  }
}

Base.prototype.utils = new Utils();