import type { NextFunction, Request, Response } from "express";

import { Controller } from "../classes/controller";

export class BookController extends Controller {
  constructor(dbs: any, sv: any, utils: any, midws: any) {
    super(dbs, sv, utils, midws);

    // Add middlewares
    // this.buildWithMiddlewares("get::test", this.midws.Authorize.user);
  }

  async ["get::"](req: Request, res: Response) {
    let code = 200;
    let data = null;
    let message = null;

    try {
      let result = await this.dbs.mongo.book.queryMultiply();
      data = result.data;
      message = result.message;

    } catch (error: any) {
      if(code === 200) code = 500;
      message = error.message;
    } finally {
      return res.status(code).json(this.utils.Http.generateHTTPResponse(code, data, message));
    }
  }
}