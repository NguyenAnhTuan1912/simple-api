import { Middleware } from "src/classes/Middleware";

// Import types
import type { Request, Response, NextFunction } from "express";

export class AuthorizeMiddleware extends Middleware {
  constructor(utils: any) {
    super(utils);
  }

  async user(req: Request, res: Response, next: NextFunction) {
    let code = 200;
    let message = null;

    try {
      const { api_key } = req.query;
      
      if(!api_key) {
        code = 401;
        throw new Error("You aren't authorized! Please login to your account If you want to do this action");
      }

      return next();
    } catch (error: any) {
      message = error.message;
      return res.status(code).json(this.utils.Http.generateHTTPResponse(code, null, message));
    }
  }
}