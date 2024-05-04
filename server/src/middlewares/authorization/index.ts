import { Middleware } from "src/classes/Middleware";

// Import settings
import { AuthSettings } from "src/auth.settings";

// Import types
import type { Request, Response, NextFunction } from "express";

export class AuthorizationMiddleware extends Middleware {
  constructor(dbs: any, serv: any, utils: any) {
    super(dbs, serv, utils);
  }

  async user(req: Request, res: Response, next: NextFunction) {
    let code = 200;
    let message = null;

    try {
      const bearerToken  = req.headers.authorization;
      if(!bearerToken) throw new Error("Toke is required");

      const [, token] = bearerToken?.split(" ");
      const tokenModelDataResult = await this.dbs.mongo.token.query(token);
      if(!tokenModelDataResult.code || !tokenModelDataResult.data) {
        code = 401;
        throw new Error("Token doesn't exist. It probably isn't created");
      }

      let verificationResult = this.serv.auth.verifyToken(tokenModelDataResult.data);
      if(!verificationResult.code) {
        code = 401;
        throw new Error(verificationResult.message!);
      }

      let role = verificationResult.data!.role;
      if(!this.serv.auth.checkUser(role)) {
        code = 403;
        throw new Error(`${role} doesn't have any permission to do this action`);
      }

      const roleModelData = await this.dbs.mongo.userRole.query(role);
      if(!roleModelData.code) {
        code = 403;
        throw new Error(roleModelData.message!);
      }

      const rights = roleModelData.data?.rights;

      return next();
    } catch (error: any) {
      message = error.message;
      return res.status(code).json(this.utils.http.generateHTTPResponse(code, null, message));
    }
  }
}