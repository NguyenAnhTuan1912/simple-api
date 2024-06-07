import { Middleware } from "src/classes/Middleware";

// Import settings
import { AuthSettings } from "src/auth.settings";

// Import types
import type { Request, Response, NextFunction } from "express";

export class AuthorizationMiddleware extends Middleware {
  constructor(dbs: any, serv: any) {
    super(dbs, serv);
  }

  /**
   * Use this method to verify `guest` or more-rights roles in app. Token doesn't require on Guests, 
   * but they have `limitations`
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  async guest(req: Request, res: Response, next: NextFunction) {
    let code = 200;
    let message = null;

    try {
      const bearerToken = req.headers.authorization;
      const verifiedToken = await this.serv.auth.verifyToken(bearerToken);

      const role = verifiedToken.code ? verifiedToken.data!.role : AuthSettings.ROLES.GUEST;

      const roleModelData = await this.dbs.mongo.userRole.query(role);
      if(!roleModelData.code) {
        code = 403;
        throw new Error(roleModelData.message!);
      }

      const { name, rights } = roleModelData.data!;
      const permissions = this.serv.auth.generatePermission(name, rights);
      const limitations = this.serv.auth.generateLimitations(req.query, permissions.data!);

      (req as any).limitations = limitations;

      return next();
    } catch (error: any) {
      message = error.message;
      return res.status(code).json(this.utils.http.generateHTTPResponse(code, null, message));
    }
  }

  async user(req: Request, res: Response, next: NextFunction) {
    let code = 200;
    let message = null;

    try {
      const bearerToken = req.headers.authorization;
      const verifiedToken = await this.serv.auth.verifyToken(bearerToken);
      if(!verifiedToken.code) {
        code = 401;
        throw new Error(verifiedToken.message!);
      }

      let role = verifiedToken.data!.role;
      if(!this.serv.auth.checkUser(role)) {
        code = 403;
        throw new Error(`${role} doesn't have any permission to do this action`);
      }

      const roleModelData = await this.dbs.mongo.userRole.query(role);
      if(!roleModelData.code) {
        code = 403;
        throw new Error(roleModelData.message!);
      }

      const { name, rights } = roleModelData.data!;
      const permissions = this.serv.auth.generatePermission(name, rights);

      (req as any).permissions = permissions;

      return next();
    } catch (error: any) {
      message = error.message;
      return res.status(code).json(this.utils.http.generateHTTPResponse(code, null, message));
    }
  }
}