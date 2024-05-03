import type { NextFunction, Request, Response } from "express";

// Import classes
import { Controller } from "../classes/Controller";

// Import types
import type {
  Mongo_BookQuery,
  Mongo_BooksQuery,
  Mongo_BookParams,
  Mongo_BookTypeQuery,
  Mongo_BookTypeParams,
  Mongo_BookAuthorQuery,
  Mongo_BookAuthorParams
} from "src/databases/mongo/index.types";

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
      let query = req.query as Mongo_BooksQuery;
      let result = await this.dbs.mongo.book.queryMultiply(query);
      
      if(!result.code) throw new Error(result.message!);

      data = result.data;
      message = result.message;

    } catch (error: any) {
      if(code === 200) code = 500;
      message = error.message;
    } finally {
      return res.status(code).json(this.utils.Http.generateHTTPResponse(code, data, message));
    }
  }

  async ["get::/authors"](req: Request, res: Response) {
    let code = 200;
    let data = null;
    let message = null;

    try {
      let query = req.query as Mongo_BookAuthorQuery;
      let result = await this.dbs.mongo.bookAuthor.queryMultiply(query);

      if(!result.code) throw new Error(result.message!);

      data = result.data;
      message = result.message;

    } catch (error: any) {
      if(code === 200) code = 500;
      message = error.message;
    } finally {
      return res.status(code).json(this.utils.Http.generateHTTPResponse(code, data, message));
    }
  }

  async ["get::/types"](req: Request, res: Response) {
    let code = 200;
    let data = null;
    let message = null;

    try {
      let query = req.query as Mongo_BookTypeQuery;
      let result = await this.dbs.mongo.bookType.queryMultiply(query);

      if(!result.code) throw new Error(result.message!);

      data = result.data;
      message = result.message;

    } catch (error: any) {
      if(code === 200) code = 500;
      message = error.message;
    } finally {
      return res.status(code).json(this.utils.Http.generateHTTPResponse(code, data, message));
    }
  }

  ///
  /// ALL THE ROUTE HAS /: WILDCARD WILL BE DEFINED HERE
  ///
  async ["get::/:id"](req: Request, res: Response) {
    let code = 200;
    let data = null;
    let message = null;

    try {
      let query = req.query as Mongo_BookQuery;
      let params = req.params as Mongo_BookParams;
      let result = await this.dbs.mongo.book.query(query, params);

      if(!result.code) throw new Error(result.message!);

      data = result.data;
      message = result.message;

    } catch (error: any) {
      if(code === 200) code = 500;
      message = error.message;
    } finally {
      return res.status(code).json(this.utils.Http.generateHTTPResponse(code, data, message));
    }
  }

  async ["get::/authors/:id"](req: Request, res: Response) {
    let code = 200;
    let data = null;
    let message = null;

    try {
      let query = req.query as Mongo_BookAuthorQuery;
      let params = req.params as Mongo_BookAuthorParams;
      let result = await this.dbs.mongo.bookAuthor.query(query, params);

      if(!result.code) throw new Error(result.message!);

      data = result.data;
      message = result.message;

    } catch (error: any) {
      if(code === 200) code = 500;
      message = error.message;
    } finally {
      return res.status(code).json(this.utils.Http.generateHTTPResponse(code, data, message));
    }
  }

  async ["get::/types/:id"](req: Request, res: Response) {
    let code = 200;
    let data = null;
    let message = null;

    try {
      let query = req.query as Mongo_BookTypeQuery;
      let params = req.params as Mongo_BookTypeParams;
      let result = await this.dbs.mongo.bookType.query(query, params);

      if(!result.code) throw new Error(result.message!);

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