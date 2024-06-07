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
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super();
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
    const __collection = this.__getCollection();
    
    return await this.handleErrorWithInterchangeAsResult<Mongo_TokenModelData, this>(this, async function(o) {
      const pipeline = [];

      // If request has params
      if(!args[0]) throw new Error("The [token] is required");

      const result = await __collection.findOne({ value: args[0] });

      if(!result) throw new Error(`The token isn't found`);

      o.data = result as Mongo_TokenModelData;
      o.message = "Query token successfully";
      
      return o;
    });
  }

  async create(...args: [string, number]) {
    const __collection = this.__getCollection();
    
    return await this.handleErrorWithInterchangeAsResult<Mongo_TokenModelData, this>(this, async function(o) {
      let tokenValue = args[0], expire = args[1];
      let token = { value: tokenValue, expire };
      let result = await __collection.insertOne(token);

      if(!result) throw new Error(`The token isn't created successfully`);

      o.data = token as Mongo_TokenModelData;
      o.message = "Create token successfully";
      
      return o;
    })
  }
}