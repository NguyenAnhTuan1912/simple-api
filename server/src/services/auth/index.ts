// Import classes
import { Service } from "src/classes/Service";

// Import settings
import { AuthSettings } from "src/auth.settings";

// Import types
import type { Permissions } from "src/types/auth.types";
import type { Databases } from "src/databases";
import type { Mongo_TokenModelData, Mongo_TokenContentData } from "src/databases/mongo/index.types";

export class AuthService extends Service {
  constructor(dbs: Databases) {
    super(dbs);
  }

  /**
   * Use this method to create a expire time for a token. `time` can be:
   *   - A string with format `<time><spaces><time prefix>`. If `time prefix` isn't provided,
   * `time prefix` will be set to `hours` or `h`.
   *   - A number, that means `time` is hours.
   *   - Undefined, that meas `time` will be set to default.
   * @param time 
   */
  private __createExpiration(time?: string | number) {
    return this.utils.datetime.getTime(time || AuthSettings.EXPIRATION._DEFAULT);
  }

  /**
   * 
   * @param tokenInHeaders 
   * @returns 
   */
  async verifyToken(tokenInHeaders?: string) {
    let code = 1;
    let data: Mongo_TokenContentData | null = null;
    let message = "";

    try {
      if(!tokenInHeaders) throw new Error("Toke is required");

      const [, token] = tokenInHeaders?.split(" ");

      const tokenModelDataResult = await this.dbs.mongo.token.query(token);
      if(!tokenModelDataResult.code || !tokenModelDataResult.data) throw new Error("Token doesn't exist. It probably isn't created");

      let expire = tokenModelDataResult.data.expire;
      let now = Date.now();

      if(expire >= now) throw new Error("The token is expired");
      
      data = JSON.parse(this.utils.crypto.decrypt(tokenModelDataResult.data.value)) as Mongo_TokenContentData;
      message = "Token is valid";
    } catch (error: any) {
      code = 0;
      message = error.message;
    } finally {
      return this.utils.http.generateInterchange(code, message, data);
    }
  }

  /**
   * Use this method to create a token from `role` and `credential` of user.
   * @param role 
   * @param credential 
   * @returns 
   */
  createToken(role: string, expire?: string | number, credential?: string) {
    return [this.utils.crypto.encrypt(JSON.stringify({ role, credential })), this.__createExpiration(expire)];
  }

  checkPermission() {
    
  }

  /**
   * 
   * @param role 
   * @param rights 
   * @returns 
   */
  generatePermission(role: string, rights: string) {
    let code = 1;
    let data: Permissions | null = null;
    let message = "";

    try {
      if(!role && !rights) throw new Error("Role and rights are required");
      data = {
        resources: [],
        actions: {}
      }
    } catch (error: any) {
      code = 0;
      message = error.message;
    } finally {
      return this.utils.http.generateInterchange(code, message, data);
    }
  }

  /**
   * 
   * @param query 
   * @param permissions 
   * @returns 
   */
  generateLimitations<T>(query: T, permissions: Permissions) {
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

  checkGuest(role: string) {
    return (
      role === AuthSettings.ROLES.GUEST ||
      this.checkUser(role) ||
      this.checkEditor(role) ||
      this.checkAdmin(role)
    );
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