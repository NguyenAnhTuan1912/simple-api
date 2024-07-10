// Import classes
import { Controller } from "../classes/Controller";

// Import types
import type { Request, Response } from "express";
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";
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
import type { Permission } from "src/types/auth.types";

export class BookController extends Controller {
  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super(dbs, serv, midws);

    // Add middlewares
    this.buildWithMiddlewares("get::", this.midws.authorization.guest);
    this.buildWithMiddlewares("get::/authors", this.midws.authorization.guest);
    this.buildWithMiddlewares("get::/types", this.midws.authorization.guest);
    this.buildWithMiddlewares("get::/:id", this.midws.authorization.guest);
    this.buildWithMiddlewares("get::/authors/:id", this.midws.authorization.guest);
    this.buildWithMiddlewares("get::/types/:id", this.midws.authorization.guest);
  }

  async ["get::"](req: Request, res: Response) {
    return await this.handleResponseError<Mongo_BookResponseData[], this>(this, res, async function(o) {
      if(!this.checkPermission(req, "book", (req as any).permission as Permission, o))
        return o;

      let query = req.query as Mongo_BooksQuery;
      let result = await this.dbs.mongo.book.queryMultiply(query);
      
      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  async ["get::/authors"](req: Request, res: Response) {
    return await this.handleResponseError<Mongo_BookAuthorModelData[], this>(this, res, async function(o) {
      this.checkPermission(req, "author", (req as any).permission as Permission, o);

      let query = req.query as Mongo_BookAuthorQuery;
      let result = await this.dbs.mongo.bookAuthor.queryMultiply(query);

      if(!result.code) throw new Error(result.message!);
      
      o.data = result.data;
      o.success!.message = result.message!;

      return o;
    });
  }

  async ["get::/types"](req: Request, res: Response) {
    return await this.handleResponseError<Mongo_BookTypeModelData[], this>(this, res, async function(o) {
      if(!this.checkPermission(req, "book_type", (req as any).permission as Permission, o))
        return o;

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
    return await this.handleResponseError<Mongo_BookResponseData, this>(this, res, async function(o) {
      if(!this.checkPermission(req, "book", (req as any).permission as Permission, o))
        return o;

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
    return await this.handleResponseError<Mongo_BookAuthorModelData, this>(this, res, async function(o) {
      if(!this.checkPermission(req, "author", (req as any).permission as Permission, o))
        return o;

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
    return await this.handleResponseError(this, res, async function(o) {
      if(!this.checkPermission(req, "book_type", (req as any).permission as Permission, o))
        return o;

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