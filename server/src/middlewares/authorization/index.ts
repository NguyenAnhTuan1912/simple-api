import { Middleware } from "src/classes/Middleware";

// Import settings
import { AuthSettings } from "src/auth.settings";

// Import types
import type { Request, Response, NextFunction } from "express";
import type { Mongo_UserRoleModelData } from "src/databases/mongo/index.types";

export class AuthorizationMiddleware extends Middleware {
  cachedRoles!: Map<string, Mongo_UserRoleModelData>;

  constructor(dbs: any, serv: any) {
    super(dbs, serv);
    this.cachedRoles = new Map();
  }

  async __getRoleData(role: string) {
    let roleData = this.cachedRoles.get(role);
    if(!roleData) {
      let _ = await this.dbs.mongo.userRole.query(role);
      roleData = _.data!;

      if(!_.code)
        throw new Error(_.message!);

      this.cachedRoles.set(role, roleData!);
    }

    return roleData;
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
      if(req.headers.authorization) {
        const bearerToken = req.headers.authorization;
        const verificationResult = await this.serv.auth.verifyToken(bearerToken);

        if(!verificationResult.code) {
          code = 401;
          throw new Error(verificationResult.message!);
        }

        const payload = verificationResult.data!;
        const roleData = await this.__getRoleData(payload.role);
        (req as any).permission = {
          actions: roleData.rights,
          resources: roleData.resources
        };

        return next();
      }

      const roleData = await this.__getRoleData("guest");
      (req as any).permission = {
        actions: roleData.rights,
        resources: roleData.resources
      };

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
      const verificationResult = await this.serv.auth.verifyToken(bearerToken);

      if(!verificationResult.code) {
        code = 401;
        throw new Error(verificationResult.message!);
      }

      const payload = verificationResult.data!;
      if(!this.serv.auth.checkUser(payload.role)) {
        code = 403;
        throw new Error(`${payload.role} doesn't have any permission to do this action`);
      }

      const roleData = await this.__getRoleData(payload.role);
          
      (req as any).permission = {
        actions: payload.actions,
        resources: roleData.resources
      };

      return next();
    } catch (error: any) {
      message = error.message;
      return res.status(code).json(this.utils.http.generateHTTPResponse(code, null, message));
    }
  }
}