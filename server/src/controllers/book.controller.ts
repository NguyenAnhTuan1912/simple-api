import type { Request, Response } from "express";

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
  Mongo_BookAuthorParams,
  Mongo_BookResponseData,
  Mongo_BookAuthorModelData,
  Mongo_BookTypeModelData
} from "src/databases/mongo/index.types";

export class BookController extends Controller {
  constructor(dbs: any, serv: any, midws: any) {
    super(dbs, serv, midws);

    // Add middlewares
    // this.buildWithMiddlewares("get::test", this.midws.Authorize.user);
  }

  async ["get::"](req: Request, res: Response) {
    return await this.handleErrorWithHTTPResponseAsResult<Mongo_BookResponseData[], this>(this, res, async function(o) {
      let query = req.query as Mongo_BooksQuery;
      let result = await this.dbs.mongo.book.queryMultiply(query);
      
      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  async ["get::/authors"](req: Request, res: Response) {
    return await this.handleErrorWithHTTPResponseAsResult<Mongo_BookAuthorModelData[], this>(this, res, async function(o) {
      let query = req.query as Mongo_BookAuthorQuery;
      let result = await this.dbs.mongo.bookAuthor.queryMultiply(query);

      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  async ["get::/types"](req: Request, res: Response) {
    return await this.handleErrorWithHTTPResponseAsResult<Mongo_BookTypeModelData[], this>(this, res, async function(o) {
      let query = req.query as Mongo_BookTypeQuery;
      let result = await this.dbs.mongo.bookType.queryMultiply(query);

      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  ///
  /// ALL THE ROUTE HAS /: WILDCARD WILL BE DEFINED HERE
  ///
  async ["get::/:id"](req: Request, res: Response) {
    return await this.handleErrorWithHTTPResponseAsResult<Mongo_BookResponseData, this>(this, res, async function(o) {
      let query = req.query as Mongo_BookQuery;
      let params = req.params as Mongo_BookParams;
      let result = await this.dbs.mongo.book.query(query, params);

      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  async ["get::/authors/:id"](req: Request, res: Response) {
    return await this.handleErrorWithHTTPResponseAsResult<Mongo_BookAuthorModelData, this>(this, res, async function(o) {
      let query = req.query as Mongo_BookAuthorQuery;
      let params = req.params as Mongo_BookAuthorParams;
      let result = await this.dbs.mongo.bookAuthor.query(query, params);

      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  async ["get::/types/:id"](req: Request, res: Response) {
    return await this.handleErrorWithHTTPResponseAsResult(this, res, async function(o) {
      let query = req.query as Mongo_BookTypeQuery;
      let params = req.params as Mongo_BookTypeParams;
      let result = await this.dbs.mongo.bookType.query(query, params);

      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }
}