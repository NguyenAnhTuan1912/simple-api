import type { NextFunction, Request, Response } from "express";

import { Controller } from "../classes/controller";

export class ExampleController extends Controller {
  constructor(db: any, sv: any, utils: any, midws: any) {
    super(db, sv, utils, midws);

    // Add middlewares
    this.buildWithMiddlewares("get::test", this.midws.Authorize.user);
  }

  async ["get::test"](req: Request, res: Response) {
    let code = 200;
    let data = null;
    let message = null;

    try {
      message = "You are authorized completely";
      data = {
        empty: null
      };
    } catch (error: any) {
      if(code === 200) code = 500;
      message = error.message;
    } finally {
      return res.status(code).json(this.utils.Http.generateHTTPResponse(code, data, message));
    }
  }

  async ["get::guess"](req: Request, res: Response) {
    let code = 200;
    let data = null;
    let message = null;
    let range = { min: 25, max: 75 };

    try {
      let { number } = req.query as { number: string };
      let n = parseInt(number);
      if(n < range.min || n > range.max ) {
        code = 406;
        throw new Error(`You should choose number between ${range.min} and ${range.max}`);
      }
      
      let mine = this.utils.Nunber.getRandom(range.min, range.max);

      if(n > mine)
        message = "You win! You choose a number is greater than mine :(";
      else
        message = "You lose! You choose a number is less than mine :)";

      data = {
        mine
      };
    } catch (error: any) {
      if(code === 200) code = 500;
      message = error.message;
    } finally {
      return res.status(code).json(this.utils.Http.generateHTTPResponse(code, data, message));
    }
  }
}