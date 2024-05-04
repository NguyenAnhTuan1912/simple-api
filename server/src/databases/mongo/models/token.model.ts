import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import mongodb settings
import { AppSettings } from "src/settings";

// Import types
import type { Db } from "mongodb";
import type { IModel } from "src/types/database.types";
import type {
  Mongo_TokenModelData
} from "../index.types";
import type { Utils } from "src/utils";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";

export class TokenModel extends Model<Mongo_TokenModelData> implements IModel<Mongo_TokenModelData> {
  protected db!: Db;
  private __dbInfo!: Mongo_DBInformations;
  private __localUtils!: MongoUtils;

  constructor(
    mongos: Mongo_Instances,
    utils: Utils,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(utils);
    this.schema = Joi.object<Mongo_TokenModelData>({
      value: Joi.string().required()
    });
    this.__dbInfo = dbInformations;
    this.__localUtils = localUtils;
    this.db = mongos.SIMPLE_API.db(this.__dbInfo.USER.NAME);
  }

  private __getCollection() {
    return this.__localUtils.getCollection<Mongo_TokenModelData>(this.db, this.__dbInfo.USER.OBJECTS.TOKEN);
  }

  async query(...args: [string]) {
    let code = 1;
    let message: string = "";
    let data: Mongo_TokenModelData | null = [] as any;
    const __collection = this.__getCollection();
    
    try {
      const pipeline = [];

      // If request has params
      if(!args[0]) throw new Error("The [token] is required");

      const result = await __collection.findOne({ value: args[0] });

      if(!result) throw new Error(`The token isn't found`);

      data = result as Mongo_TokenModelData;
      message = "Query token successfully";
    } catch (error: any) {
      code = 0;
      message = error.message;
      data = null;
    } finally {
      return this.utils.http.generateInterchange(code, message, data);
    }
  }

  async create(...args: [string, number]) {
    let code = 1;
    let message: string = "";
    let data: Mongo_TokenModelData | null = null as any;
    const __collection = this.__getCollection();
    
    try {
      let tokenValue = args[0], expire = args[1];
      let token = { value: tokenValue, expire };
      let result = await __collection.insertOne(token);

      if(!result) throw new Error(`The token isn't created successfully`);

      data = token as Mongo_TokenModelData;
      message = "Create token successfully";
    } catch (error: any) {
      code = 0;
      message = error.message;
      data = null;
    } finally {
      return this.utils.http.generateInterchange(code, message, data);
    }
  }
}