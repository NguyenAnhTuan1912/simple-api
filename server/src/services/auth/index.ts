// Import classes
import { Service } from "src/classes/Service";

// Import settings
import { AuthSettings } from "src/auth.settings";

// Import types
import type { Databases } from "src/databases";
import type { Utils } from "src/utils";
import type { Mongo_TokenModelData, Mongo_TokenContentData } from "src/databases/mongo/index.types";

export class AuthService extends Service {
  constructor(dbs: Databases, utils: Utils) {
    super(dbs, utils);
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
   * @param token 
   * @returns 
   */
  verifyToken(token: Mongo_TokenModelData) {
    let code = 1;
    let data: Mongo_TokenContentData | null = null;
    let message = "";
    const { value, expire } = token;

    try {
      let now = Date.now();
      if(expire >= now) throw new Error("The token is expired");
      data = JSON.parse(this.utils.crypto.decrypt(value)) as Mongo_TokenContentData;
      message = "Token is valid";
    } catch (error: any) {
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

  /**
   * 
   * @param role 
   * @param query 
   * @returns 
   */
  createLimitations<T>(role: string, query: T) {
    let code = 1;
    let data: Mongo_TokenContentData | null = null;
    let message = "";

    try {
      
    } catch (error: any) {
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