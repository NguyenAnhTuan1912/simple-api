// Import classes
import { Service } from "src/classes/Service";

// Import settings
import { AuthSettings } from "src/auth.settings";

// Import types
import type { Permission } from "src/types/auth.types";
import type { Databases } from "src/databases";
import type { Mongo_TokenContentData } from "src/databases/mongo/index.types";

export class AuthService extends Service {
  constructor(dbs: Databases) {
    super(dbs);
  }

  /**
   * Use this method to verify token
   * @param tokenInHeaders 
   * @returns 
   */
  async verifyToken(tokenInHeaders?: string) {
    return await this.handleInterchangeError<Mongo_TokenContentData, this>(this, async function(o) {
      if(!tokenInHeaders) throw new Error("Toke is required");

      const [, token] = tokenInHeaders?.split(" ");

      if(!token) throw new Error("Token isn't found");
      if(!((await this.dbs.mongo.token.query(token)).code)) throw new Error("Token isn't found");
      
      let tokenPayload: Mongo_TokenContentData = JSON.parse(this.utils.crypto.decrypt(token));
      let expire = tokenPayload.expire;
      let now = Date.now();
      
      // 1. Check provider
      if(tokenPayload.provider !== AuthSettings.PROVIDER)
        throw new Error("The token provider isn't valid");
      
      // 2. Check expiration
      if(expire <= now) {
        await this.dbs.mongo.token.delete(token);
        throw new Error("The token is expired");
      }

      o.data = tokenPayload;
      o.message = "Token is valid";

      return o;
    });
  }

  /**
   * Use this method to create a token from `role` and `credential` of user.
   * @param role 
   * @param credential 
   * @returns 
   */
  async createToken(role: string) {
    let period = this.utils.datetime.getTime(
      AuthSettings.EXPIRATION._DEFAULT.value +
      AuthSettings.EXPIRATION._DEFAULT.postfix
    );
    let roleResult = await this.dbs.mongo.userRole.query(role);
    
    if(!roleResult.code)
      throw new Error("Invalid role");

    let tokenPayload: Mongo_TokenContentData = {
      role: role,
      expire: period,
      provider: AuthSettings.PROVIDER!,
      actions: roleResult.data!.rights
    };

    let token = this.utils.crypto.encrypt(JSON.stringify(tokenPayload));

    return token;
  }

  /**
   * Use this method to create permission
   * @param rights 
   * @returns 
   */
  generatePermission(rights: string) {
    return this.handleInterchangeError<Permission, this>(this, function(o) {
      o.data = {
        resources: [],
        actions: rights
      };
      
      return o;
    });
  }

  /**
   * 
   * @param query 
   * @param permission
   * @returns 
   */
  generateLimitations<T>(query: T, permission: Permission) {
    let code = 1;
    let data: Mongo_TokenContentData | null = null;
    let message = "";

    try {
      
    } catch (error: any) {
      code = 0;
      message = error.message;
    } finally {
      return this.utils.http.generateInterchange(code, message, data);
    }
  }

  checkUser(role: string) {
    return (
      role === AuthSettings.ROLES.USER ||
      this.checkEditor(role) ||
      this.checkAdmin(role)
    );
  }

  checkEditor(role: string) {
    return (
      role === AuthSettings.ROLES.EDITOR ||
      this.checkAdmin(role)
    );
  }

  checkAdmin(role: string) {
    return role === AuthSettings.ROLES.ADMIN;
  }
}