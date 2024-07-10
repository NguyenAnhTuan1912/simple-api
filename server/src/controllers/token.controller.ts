import cron from "node-cron";

// Import classes
import { Controller } from "../classes/Controller";

// Import auth settings
import { AuthSettings } from "src/auth.settings";

// Import types
import type { Request, Response } from "express";
import type { Databases } from "src/databases";
import type { Services } from "src/services";
import type { Middlewares } from "src/middlewares";

export class TokenController extends Controller {
  constructor(dbs: Databases, serv: Services, midws: Middlewares) {
    super(dbs, serv, midws);
  }

  async ["get::token/user"](req: Request, res: Response) {
    return await this.handleResponseError<string, this>(this, res, async function(o) {
      let token = await this.serv.auth.createToken(AuthSettings.ROLES.USER);
      let result = await this.dbs.mongo.token.create(token);
      
      if(!result.code) throw new Error(result.message!);

      // Setup scheduler to delete expired token
      // Second Minute Hour DayOfMonth Month DayOfWeek
      let that = this;
      let [hour, minute, second] = this.utils.datetime
                                              .getTimeString(
                                                AuthSettings.EXPIRATION._DEFAULT.value +
                                                AuthSettings.EXPIRATION._DEFAULT.postfix
                                              )
                                              .split(":");
      let expiration = parseInt(minute) + parseInt(AuthSettings.EXPIRATION._DEFAULT.value);
      let schedule = cron.schedule(`${second} ${expiration} ${hour} * * *`, function() {
        console.log("Delete Token!!!");
        that.dbs.mongo.token.delete(token);
        schedule.stop();
      });
      
      schedule.start();

      o.data = token;
      o.success!.message = result.message!;

      return o;
    });
  }
}